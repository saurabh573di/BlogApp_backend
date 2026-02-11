import UserModel from "../models/User.model.js";

//import the validator file 
import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/ErrorResponse.util.js";
import { generateJwtToken } from "../utils/jwt.util.js";
// export const register = async (res,req,next)=>{


//   //! hwer we are using the try and catch to handle error with error handliing middleware 
// //   try{

// // we are validating req.body using joi 
// //first import the file where you have written the validaton code 
// // in second step validate the req.body with the validation file  

// //imporant to handlee the validation error in the controller we can cretea a error middleware 

// /*

// for this lower commneted code 
// /for the lower code we can write this code in error middelare and simplly use next here 
//    let {error,value }=  userRegistrationSchema.validate(req.body)
//    if(error){
//     let message = error.details.map(err=>err.message);

//     return res.status(400).json({
//       sucess:false,
//       message,
//     })
//    }
// */
// //    let {error,value }=  userRegistrationSchema.validate(req.body)
// //    if(error){
// //     let message = error.details.map(err=>err.message);

// //     return res.status(400).json({
// //       sucess:false,
// //       message,
// //     })
// //    }
// //       const { name, age, email, isMarried, password } = req.body;
// //   let newUser = await UserModel.create({
// //     name,
// //     age,
// //     email,
// //     isMarried,
// //     password,
// //   });
// //   res.status(201).json({

// //     success: true,
// //     message: "User registered successfully",
// //     data: newUser,
// //   });
// // }

// // catch(error){
 
// //     next(error);


// //   }
// // }

// //*we have dont this today 

// //& here we are using the asyncHandler with error handling middlware to catch the error
// // ^here we dont need to call the next because the next() is called interanllay 
// export const register = asyncHanlder (async (req,res,next)=>{



//   // the commnet below in pink is for error handling  middleware when you are using only the error handling middleware -.
//   //& let {error,value }=  userRegistrationSchema.validate(req.body)  // 
//   //&  if(error){

//   //&   let message = error.details.map(err=>err.message);

//   //&  return res.status(400).json({
//   //&     sucess:false,
//   // &    message,
//   // &  })
//   // & }
//       const { name, age, email, isMarried, password } = req.body;
     

//       //step 1 iantall the bcrypt.js module 

// //$ step 2 


// // these botth are returning a promise so await it 
// // let salt = await bcryptjs.genSalt(10)
//    //! here we are writing the jwt code for to hash the password using salt technique
// // //*step 3  will be in login controllwe theier we will compare the stored hash password with new enter password 
      
// //     let hashedPassword = await bycryptjs.hash(password,salt )




//  // here we are creating a new useer using the mongodb methods and userModel is our database schema 
//       // this line means if user if not present than create a new user 

//   let newUser = await UserModel.create({
//     name,
//     age,
//     email,
//     isMarried,
//     password,// hashed pasword 
//   });
//   res.status(201).json({

//     success: true,
//     message: "User registered successfully",
//     data: newUser,
//   });
// }


// );







// export const getUsers = async (res,req,next)=>{
// try{

//   // find method is mongodb find method not jsmethod  here
  
//     let allUsers = await UserModel.find();

//     // this condition is for when the user is not present 
//     if (allUsers.length === 0) {
//       // return res.status(404).json({
//       //   success: false,
//       //   message: "No users found",
//       // });
//       // throw new Error("No users found!!!!");
//       // new ErrorResponse("msg", 404)

//       throw new ErrorResponse("no user found",404)
//     }

//     // this is sending res for when user got found 
//     res.status(200).json({
//       success: true,
//       message: "Users fetched successfully",
//       count: allUsers.length,
//       data: allUsers,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // to get only signle user 
// export const getUser = async (req,res,next)=>{

//   try {
//     let userId = req.params.id;
//     // let user = await UserModel.findOne({ _id: userId });  // this is monodb method 
// // here we are getting the single using 
//     let user = await UserModel.findById(userId);// this is a monggose method for to find 

//     if (!user)
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });

//     res.status(200).json({
//       success: true,
//       message: "User fetched successfully",
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// export const updateUser= async (req,res,next)=>{
//   try {

    

    
//     let userId = req.params.id;
//     let updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
//       new: true, // display the updated document
//           runValidators: true, // to validate the updated data
//     });

//     if (!updatedUser)
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: updatedUser, // we are sendind reponse the updateUser data towards the client or froontend  
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async ()=>{

//     let userId= req.params.id
//     let deletedUser= UserModel.findByIdAndDelete(userId)
//   if (!deletedUser)
//     return res.status(404).json({
//       success: false,
//       message: "No user found",
//       data: deletedUser,
//     });

//   res.status(200).json({
//     success: true,
//     message: "User deleted successfully",
//     data: deletedUser,
//   });
// };


// // & creating  a function for login using jwt auth

// export  const login = asyncHanlder(async(req,res,next)=>{

//   const {email,password}=req.body;
 

//   //*step 1 
//   //! this is step 3 for hashig the password
//   // we will compare the stored hashpssword with the new enterred password.first we enter the hash pass
//   //! this lower commentd code is inbuilt method for to compare we will use this when we do our hasing in the controller 
//   // let isMatched = await bcrypt.js.compare(password,existingUser.password);

//   //! this is for way 2 when the hashing is done in the model then use the function whcih you have creteed in the model to compare tha t
  
//   let existingUser = await UserModel.findOne({ email });
//   if (!existingUser) throw new ErrorResponse("Invalid Credentials", 404);


//   // let isMatched = await bcryptjs.compare(password, existingUser.password);
//   let isMatched = await existingUser.comparePassword(password);
//   if (!isMatched) return next(new ErrorResponse("Invalid credentials", 400));

//     //*we can wither use this way 
//   //   throw new ErrorReponse("Invalid credentials ",404)
//    //!
//   //^ or usig next here we are calling the errohandling middleware  explicailty means manuaallyn and using the custom error class also 


//   //^ synatx for to create secret key sign(payload,secret_key,options )
//   //& aftet this line code we save all code  difrrent file 
//   // let token = Jwt.sign({payKey:existingUser.name},"secret")//* we will ned this same secret key when  we decide the data  now we are encoding the data 
//   // console.log(token);
// let token = generateJwtToken(existingUser.name);
//   console.log("token: ", token);



//   //&  res.cookie("tokenName","value",{options})    this will send cookies to the clients brower 
//   res.cookie("token", token, {
//     maxAge: 10 * 60 * 1000, // 10 mins (in ms) , this sets an expiry for the token on the browser
//     secure: false,  // ← change to false for development
//     httpOnly: true,
//     sameSite: "lax",  // ← change from "none"
//     path: "/",
//   });

// res.status(200).json({
//   sucess:true,
//   message:"user loggged i ",
//   token ,
// })

// })






// //wednesday todau
// export const logout=asyncHanlder(async(req,res,next)=>{
//   // first we will clear the cokkie 
//   //its method will be post in route
//   // res.cleatCokkie is a method used to clear cokkie
//   res.clearCookie("token",{
//     //options we will use the options when we deploy
//        maxAge: 1,
//     httpOnly: true,
//     sameSite: "none",
//     path: "/",
//   });

//   res.status(200).json({
//     success:true,
//     message:"user logged out "
//   });
// });


// export const getProfile = asyncHanlder(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "Profile fetched successfully",
//     data: req.myUser,
//   });
// });

// export const updateProfile = asyncHandler(async (req, res, next) => {
//   // req.myUser
// });

// export const deleteProfile = asyncHandler(async (req, res, next) => {
//   // req.myUser
// });

// // u1
// // u2 -> logged in
// // u3
// // u4

//! the upper code is for learning curd operation and jwt auth 

export const register = asyncHandler(async (req, res, next) => {
  // console.log(resp);
  // return res.status(200).json(resp);

  const { name, age, email, isMarried, password } = req.body;

  // let salt = await bcryptjs.genSalt(10);
  // let hashedPassword = await bcryptjs.hash(password, salt);
  // //? this is a one way hashing

  let newUser = await UserModel.create({
    name,
    age,
    email,
    isMarried,
    password /* : hashedPassword, */,
  });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: newUser,
  });
});

export const getUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    // let user = await UserModel.findOne({ _id: userId });
    let user = await UserModel.findById(userId).populate({
      path: "blogs.blogId",
      select: "title description createdAt -_id",
    });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    // let formattedResp = user.blogs.map((blog) => {
    //   return {
    //     title: blog.blogId.title,
    //     description: blog.blogId.description,
    //     createdAt: blog.blogId.createdAt,
    //   };
    // });

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser = await UserModel.findOne({ email });
  if (!existingUser) throw new ErrorResponse("Invalid Credentials", 404);

  // let isMatched = await bcryptjs.compare(password, existingUser.password);
  let isMatched = await existingUser.comparePassword(password);
  if (!isMatched) return next(new ErrorResponse("Invalid credentials", 400));

  let token = generateJwtToken(existingUser.name);
  console.log("token: ", token);

  res.cookie("token", token, {
    maxAge: 10 * 60 * 1000, // 10 mins (in ms) , this sets an expiry for the token on the browser
    secure: false,  // ← change to false for development
    httpOnly: true,
    sameSite: "lax",  // ← change from "none"
    path: "/",
  });
  //? res.cookie("tokenName", "value", {options}); this will send cookies to the client's browser

  res.status(200).json({
    success: true,
    message: "User logged in",
    token,
  });

  //? sign(payload, secret_key, options)
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    maxAge: 1,
    httpOnly: true,
    sameSite: "none",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "User logged out",
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: req.myUser,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  // req.myUser
});

export const deleteProfile = asyncHandler(async (req, res, next) => {
  // req.myUser
});
