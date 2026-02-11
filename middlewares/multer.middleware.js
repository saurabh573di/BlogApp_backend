//! we have 2 options to store the images 
// 1 in disk storage on deployment plateform
// in memory stoarae means ram on deploymet plateform 
// when we deploye our app then we use disk storage but  the free version do not provide us the diskstorage so we use the memory storage 


//^ mukter is a middleware 

// we do not storae any file permanently on wever we store that on any cloud like cloudinary 


//& cloudinary is a cloud storge
// .when a use upload a file we store that in server then the server sends that to cloudinary ,cloudinary saves that image permanenty and return a url .
// we use that url in our sever to store that file.
// and after that we delete that file from sever 
// we first store the image in the cloudinary then delete the file from the server 
// we store the image in the sever for a temporary time until that image does not get uploaded in the cloudinary . when it uploaded in cloudinary then we delete it .



// we can not use the disk storage becuse when we deploye we will get error because free deploy do not provide us disk storage
// so when you are deplo ye on free use the memory ram stparage 
//! this lower commenteed code is for the disk storage of multer means we are uploading files and saviing them on our local laptop storage 
// import multer from "multer";

// const myStorage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "----" + file.originalname);
//   }, //? in your server, this will be the name of the file
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp"); //? this folder should be present the directory (should be relative to the main file)
//   }, //? in your server, this will be the path of the file
// });


// //19 dec 2025
// const myFileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     }
//     else {
//         cb(
//             new ErrorResponse(
//                 "only inage file with extension .jpg,.jpeg,.png,.gif are allowed ",
//                 400,
//             ),
//             false
//         );
//     }
// };
// const upload = multer(
//     {
//         storage: myStorage,
//         fileFilter: myFileFilter,
//         limits: {
//             fileSize: 1 * 1024 * 1024          //? this option is used for to limite the storage which a user can upload for eg here user can only uppload maximum of 2 mb
            

//         }
//     })

// export default upload;

//code 11000 means duplicate key error 


import multer from "multer";
import ErrorResponse from "../utils/ErrorResponse.util.js";

// here we are using the memory storage of multer because when we deploy our app on free deployment platform then we do not get disk storage so we use memory storage and when we use memory storage then the file will be stored in the ram of the deployment platform and after that we will upload that file to cloudinary and after uploading that file to cloudinary then we will delete that file from the ram of the deployment platform

const myStorage = multer.memoryStorage();

// Validate file types before upload
const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  const isValidFileType = allowedMimeTypes.includes(file.mimetype);

  if (isValidFileType) {
    callback(null, true);
  }
  else
  {
    const error = new ErrorResponse("Only image files with extensions .jpg, .jpeg, .png, .gif are allowed", 400);
    callback(error, false);
  }
};

// Configure multer with storage, validation, and size limits
const upload = multer({
  storage: myStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB maximum file size
  }
});

export default upload;

// NOTE: When using this uploader, ensure your HTML form includes:
// <form enctype="multipart/form-data">
