import joi from "joi";

// create a layout which will be compared with req.body
//req.body is the data that comes from the frontend
// req.body is the data what we let user to store in the db 

// this for resisration fucntion in controller
 export let userRegistrationSchema = joi.object({
    // here sequence matters first use datatype then others 
    // first use dtatypes after that no sequence matters 
    name:joi.string().required().min(3).max(49),
    email:joi.string().required().email(),
    password:joi.string().required().min(1).max(50),// in pattern you can give chracter for strong password it will check the chracter are presnt if not give error 
    age:joi.number().required().min(1).max(90),
    isMarried:joi.boolean().optional()
 });

 // compare this layout with you requst.body;


 // you have to define validator function for evry function wchic is using req.body in controller

 // for thenupdate function in controller

 export let userUpdatedSchema = joi.object({
    // here sequence matters first use datatype then others 
    // first use dtatypes after that no sequence matters 
    name:joi.string().required().min(3).max(49).optional(),
    email:joi.string().email().optional(),
    password:joi.string().required().min(1).max(50),// in pattern you can give chracter for strong password it will check the chracter are presnt if not give error 
    age:joi.number().required().min(1).max(90),
    isMarried:joi.boolean().optional()
 })

export const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(3).max(50),
});

 //imporant to hancle the validation error in the controller we can cretea a error middleware 
