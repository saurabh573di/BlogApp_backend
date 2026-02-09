//&step 1 for how to deelted file from server after file get successfully uploaded in the clodudinary 
import v2 from "../config/cloudinary.config.js";



// //*this uploadiage is for to  upload  the image 
// import fs from "node:fs";

// export const uploadImage = async (filePath) => {
//   console.log("called");
//   if (!filePath) return null;
//   let result = await v2.uploader.upload(filePath, {
//     folder: "blogApp",
//     resource_type: "image",
//     // transformation: { width: 360, height: 360, crop: "limit" },
//   });
//   if (result) {
//     fs.unlinkSync(filePath);
//   }
//   return result;
// };

// //& how to delete

// export const deleteImage = async (id) => {
//   console.log("delete called");
//   let result = await v2.uploader.destroy(id);
//   console.log("result: ", result);
//   return result;
// };


//! this configration is for to upload the image in using ram configuration  

import v2 from "../config/cloudinary.config.js";

export const uploadImage = async (dataURL) => {
  if (!dataURL) return null;
  let result = await v2.uploader.upload(dataURL, {
    folder: "BlogApp",
    resource_type: "image",
  });

  // if (result) {
  //   fs.unlinkSync(filePath);
  // }

  return result;
};

export const deleteImage = async (id) => {
  console.log("delete");
  let result = await v2.uploader.destroy(id);
  console.log("result: ", result);
  return result;
};