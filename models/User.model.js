// // fisrt we create schema  (strcuture) = mongoose (mongoose is a odm = object data modelling)
// // we give input in normal js objects and in the dtabase the data in form of documents  that conversion is done by mongoose

// //  odm  = object data modeeloings is done by mognoose means we write the dta in plain js object but in db the dta stoed in the form of document that mapping is done by mongosse 

// //  it helps to add strcuture and validation to the mongodb collections.
// // {middleware,plugin,validations etc }

 




// /// steps to cretae collection using mongoose

// // step 1 import mongoose
// // step 2 create strcuture using mongoose .Schema
// //step 3  create a modal/ collection using model( method)
// // step 4 export the model/collection 

// import { timeStamp } from "console";
// import mongoose from "mongoose";


// // we are creating a schmea 
// let userSchema = new mongoose.Schema(
// {// these are definations 
//     name:{
//         type:String,
        
//     },
//     email:{
//         type:String,
//           required:true   ,     // required true means it is neccesary 
//           lowercase:true,
//           trim:true,
//     },
//     password:{
//         type:String,
//           required:true,
//     },
//      age:{
//         type:Number,
//           required:true,
//     },
//      isMarried:{
//         type: Boolean,
//     },




// }
// ,{  // after this are options 
//       versionKey: false, //! to remove __v field
//     timeStamps:true 
// }
// );



// // this hashing we write here will run when a new reousre is created only 

// //& this approch is beteter than hashing the pass in controller beac8use when we do in controller than we have to do that for every function where you want to do the hashing
// // but when you do this in model the password hasing is done automatically by here 
// //! these steps for jwt for hashing the password we have 2 ways first use in controller second use here in model

// //^ we will create a new function for 

// userSchema.pre("save",async function(){
//     let salt = await Bcrypt.js.genSalt(10);
//     let hashedPassword = await bcryptjs.hash(this.password,salt )
//     // save the passsword in the db
//     this.password = hashedPassword;
// })

// // how to compare this password with the entered pass .monggose do not provide any inbuilt method to 
// //comoare this so we will create our own function

// userSchema.methods.comparePassword= async function (enteredPassword){


//   return  bcryptjs.compare(enteredPassword, this.password);
// };


// // model method will take name ans schema and 
// //sutax   model("collectionName","schema")  takes  2 argument . collection name and schema . it will convetrt the schema into mongodb collection 

// //  we write the name in the cammel case in the file bu the mongoose convert the   collection name to  (lowercase + plural)  => users into the dtabase . 
// // and in the database that name will be stored like  (lowercase + plural)  => users this 


// // we have created a collection using my schema by mongoose.scheema method 
// let UserModel = mongoose.model("User",userSchema)


// //step 4 
// export default UserModel;

// // imporatnt

// // all the validation is happening in database level.

// // question what is timestam
// // what is


//! check the upper code for real code check the upper code if you want to learn how to create a model using mongoose and how to do password hashing and how to compare the password with the entered password

import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    isMarried: {
      type: Boolean,
    },
    totalBlogs: {
      type: Number,
      default: 0,
    },
    blogs: [
      {
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
        },
        _id: false,
      },
    ],
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  {
    versionKey: false, //! to remove __v field
    timestamps: true, // it adds createdAt and updatedAt fields
  },
);

//! password hashing --> pre hook (default) before creating any new resource, run this pre hook middleware which is provided by mongoose
userSchema.pre("save", async function () {
  let salt = await bcryptjs.genSalt(10);
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
}); //! save() will internally call this pre-hook

// userSchema.methods.methodName = function(){}

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};

let UserModel = mongoose.model("User", userSchema);
//? model("collectionName", "schema") takes two argument, collection-name and schema, it will convert the schema into mongodb collection
//~ the collection name will be (lowercase + plural) -> users

export default UserModel;

//! all the validations are happening at database level

let user = {
  name: "",
  email: "",
  password: "",
  age: 0,
  isMarried: false,
  totalBlogs: 2,
  blogs: [{ blogId: "ref" }, { blogId: "ref2" }],
};