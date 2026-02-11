



// we will use this middleware as a route level middleware 

// this middleare is used for every route controller function 
import ErrorResponse from "../utils/ErrorResponse.util.js";
// 

export const validateBody = (schema) => {
  return (req, res, next) => {
    // this error will the error  whcic we get after the validation
    // the value the is the validated body 
    let { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      // after a error we get a error array  then use map to get the new array . and use join to convert the array into the string
      // inside the error we get a a property details thats why we are usning error.details  
      let message = error.details.map((err) => err.message).join(", ");
    //   return res.status(400).json({
    //     success: false,
    //     message,
    //   });
     throw new ErrorResponse(message, 400);
    }

    // now we are changing the orignal req.body with our validated body 
         

    req.body=value;
    next();
  };
};