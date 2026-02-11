//here we are creating error moddlware for to handle the eroors at the bad requst time 
// always use error middleware just befoe the app.listen 
// if you will use erro handler at first it will alwys give error if error is present and not


export const errorHandler = (err, req, res, next) => {
  //! short circuiting
  err.message = err.message || "Something went wrong";
  err.statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = err.message;
  } else if (err.code === 11000) {
    let key = Object.keys(err.keyValue);
    key = key[0].toUpperCase();
    err.statusCode = 409;
    err.message = `${key} already exists`;
  } else if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.name === "MulterError") {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      err.statusCode = 400;
      err.message = "You can only upload one image";
    } else if (err.code === "LIMIT_FILE_SIZE") {
      err.statusCode = 400;
      err.message = "File size should be less than 1MB";
    }
  } else if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Invalid token, Please login again!";
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errObject: err,
    errLine: err.stack,
  });
};

//Middleware function, with four parameters (err, req, res, next)
//! use this errorMiddleware in the entry file, inside app.use(errorMiddleware),
//! the location of app.use(errorMiddleware) is very important --> it should be after all the routes or above listen method

//? use trycatch block to handle errors, in catch block, call next(error)
//? next(error) ==> this will call the errorHandler middleware by passing the error object to the middleware where we can handle the error gracefully


// steps to create and use error middleware
// first     definae a errormiddleware function with 4 parameters (err,req,res,next)
// use the erroemiddleware in the entry file means main.js ,inside app.use(middlewarename)

// the location of app.use(errorhandlemiddleware)  is very important => it should =>  it should be after all the routes or above the listen method 


// use trycatch block to hankde eriir , in the catch block,call next(error)

// next(error)  = this will call the errorhandler middleware by passing the error object to the middleware 
// where we can handle the error gracefully