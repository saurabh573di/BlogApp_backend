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

import multer from "multer";

const myStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "----" + file.originalname);
  }, //? in your server, this will be the name of the file
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); //? this folder should be present the directory (should be relative to the main file)
  }, //? in your server, this will be the path of the file
});


//19 dec 2025
const myFileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(
            new ErrorResponse(
                "only inage file with extension .jpg,.jpeg,.png,.gif are allowed ",
                400,
            ),
            false
        );
    }
};
const upload = multer(
    {
        storage: myStorage,
        fileFilter: myFileFilter,
        limits: {
            fileSize: 1 * 1024 * 1024          //? this option is used for to limite the storage which a user can upload for eg here user can only uppload maximum of 2 mb
            

        }
    })

export default upload;

//code 11000 means duplicate key error 
