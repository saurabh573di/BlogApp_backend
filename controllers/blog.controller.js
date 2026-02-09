
import asyncHandler from "express-async-handler";
import BlogModel from "../models/Blog.model.js";
import UserModel from "../models/User.model.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.util.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";
import { generateBlogDescription } from "../utils/gemini.util.js";


/*
// export const addImage = asyncHandler(async (req, res, next) => {
//   return { secure_url };
// });




! this code is for when we use disk stoage in cloudinary 
export const addBlog = asyncHandler(async (req, res, next) => {

  const { title, description, category, tags } = req.body;

  const userId = req.myUser._id;
  let secure_url = "";
  let public_id = "";
  if (req.file) {
    let resp = await uploadImage(req?.file?.path);
    console.log("resp: ", resp);
    secure_url = resp?.secure_url;
    public_id = resp?.public_id;
  }

  let newBlog = await BlogModel.create({
    title,
    description,
    category,
    tags,
    image: { secure_url, public_id },
    createdBy: userId,
  });

  await UserModel.updateOne(
    { _id: userId },
    {
      $inc: { totalBlogs: 1 },
    },
  );

  await UserModel.updateOne(
    { _id: userId },
    { $push: { blogs: { blogId: newBlog._id } } },
  );

  //   let newBlog = new BlogModel({ title, description, category, tags });
  //   let savedBlog = await newBlog.save();
  //   console.log("savedBlog: ", savedBlog);

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    payload: newBlog,
  });
});

*/

//!this code is for when we use memory  stoage in cloudinary 

// export const addImage = asyncHandler(async (req, res, next) => {
//   return { secure_url };
// });

const getDataURL = (bufferValue, mimetype) => {
  const b64 = bufferValue.toString("base64");
  return `data:${mimetype};base64,${b64}`;
};

export const addBlog = asyncHandler(async (req, res) => {
  const { title, description, category, tags } = req.body;
  const userId = req.myUser._id;

  let image = { secure_url: "", public_id: "" };

  if (req.file) {
    const dataURL = getDataURL(req.file.buffer, req.file.mimetype);
    const uploadedImage = await uploadImage(dataURL);

    if (uploadedImage) {
      image = {
        secure_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }
  }

  const newBlog = await BlogModel.create({
    title,
    description,
    category,
    tags,
    image,
    createdBy: userId,
  });

  await UserModel.updateOne(
    { _id: userId },
    {
      $inc: { totalBlogs: 1 },
      $push: { blogs: { blogId: newBlog._id } },
    },
  );

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    payload: newBlog,
  });
});

export const getBlogs = asyncHandler(async (req, res, next) => {
  // let blogs = await BlogModel.find();

  let blogs = await BlogModel.find().populate({
    path: "createdBy",
    select: "email name -_id", //? "name -_id"
  });

  // let blogs = await BlogModel.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       foreignField: "_id",
  //       localField: "createdBy",
  //       as: "createdBy",
  //     },
  //   },
  //   {
  //     $project: {
  //       "createdBy.email": 1,
  //       title: 1,
  //       description: 1,
  //     },
  //   },
  // ]);

  if (blogs.length === 0) return next(new ErrorResponse("No Blogs found", 404));

  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    count: blogs.length,
    data: blogs,
  });
});

export const getBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;

  const blog = await BlogModel.findById(blogId).populate({
    path: "createdBy",
    select: "email name -_id", //? "name -_id"
  });
  // const blog = await BlogModel.findById(blogId).populate("createdBy");

  if (!blog) return next(new ErrorResponse("Blog not found", 404));

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    payload: blog,
  });
});

export const updateBlogDetails = asyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let blogId = req.params.id;

  let blog = await BlogModel.findOneAndUpdate(
    { _id: blogId, createdBy: userId }, // filter
    req.body, // updation value
    {
      new: true,
      runValidators: true, // options
    },
  );

  if (!blog) return next(new ErrorResponse("Blog not found", 404));

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    payload: blog,
  });
});

export const updateImage = asyncHandler(async (req, res, next) => {
  let blogId = req.params.id;
  let userId = req.myUser._id;

  let blog = await BlogModel.findOne({ _id: blogId, createdBy: userId }); // filter
  if (!blog) return next(new ErrorResponse("Blog not found", 404));

  let oldPublicId = blog?.image?.public_id;

  //! new image ---> upload
  // let path = req?.file?.path;
  // let { secure_url, public_id } = await uploadImage(path);

  let secure_url = "";
  let public_id = "";

  if (req.file) {
    let dataURL = getDataURL(req.file.buffer, req.file.mimetype);

    let uploadedImage = await uploadImage(dataURL);
    if (uploadedImage) {
      secure_url = uploadedImage.secure_url;
      public_id = uploadedImage.public_id;
    }
  }

  blog.image.secure_url = secure_url;
  blog.image.public_id = public_id;

  await blog.save();
  console.log("blog: ", blog);

  console.log("oldPublicId: ", oldPublicId);
  await deleteImage(oldPublicId);

  res.status(200).json({
    success: true,
    message: "Image updated Successfully",
  });
});

export const deleteBlogImage = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.myUser._id;

  let blog = await BlogModel.findOne({ _id: blogId, createdBy: userId });
  if (!blog) return next(new ErrorResponse("Blog Not Found!!!", 404));

  let imageId = blog.image.public_id;

  let resp = await deleteImage(imageId);
  if (resp.result == "ok") {
    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Image not deleted",
    });
  }
});

export const generateDescription = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  const description = await generateBlogDescription(title);
  console.log("description: ", description);

  let contents = description.candidates[0].content.parts[0].text;

  res.json({
    success: true,
    message: "Description generated successfully",
    contents,
  });
});

export const deleteBlog = asyncHandler(async (req, res, next) => {
  const userId = req.myUser._id;
  const blogId = req.params.id;

  const blog = await BlogModel.findOneAndDelete({
    _id: blogId,
    createdBy: userId,
  });

  if (!blog) return next(new ErrorResponse("Blog not found", 404));

  await UserModel.updateOne(
    { _id: userId },
    {
      $inc: { totalBlogs: -1 },
      $pull: { blogs: { blogId } },
    },
  );

  if (blog?.image?.public_id) {
    await deleteImage(blog.image.public_id);
  }

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// https://github.com/Wolfgang281/TypeIT-BlogApp

// https://excalidraw.com/#json=1cGWSYHIvaQP37vyUe1ym,GidcqZK0SYxklH-MZhU1mA

//! google ai studio >> get an api key >> create api key >> create a variable in .env and paste the api key
// ? then install npm install @google/genai



// now after this we create a function to genrate contnen based on the tittle , using google ai studio 
// first get the google gemini api key use only freee version not paid 
// then create a utli file for the utlization  then only  importnat  that function  and use here 



