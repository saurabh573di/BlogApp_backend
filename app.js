

// use these 4 commentaed line in a sepraet file r
// import userRoutes from "./routes/user.route.js";
// import express from "express";
// import mongodb config from dtabase.config.js

import connectDB from "./config/database.config.js";
import cookieParser from "cookie-parser";
// importing the errorhandling middkeware function 
import { errorHandler } from "./middleware/errorHandler.middleware.js";
// now connect the db
import express from "express"
// import dotenv from "dotenv"; create new index.jjs file and call it therer

import { PORT } from "./config/index.js";
// dotenv.config(); // MUST be at the top  // import dotenv from "dotenv"; create new index.jjs file and call it therer


import { authenticate, authorize } from "./middleware/auth.middleware.js";
import adminRoutes from "./routes/admin.route.js";
import blogRoutes from "./routes/blog.route.js";
import userRoutes from "./routes/user.route.js";




connectDB();





const app = express();

//? data seeding
if (process.argv[2] === "seedAdmin") {
  seedAdmin();
}
app.use(
  cors({
    // origin: ["http://localhost:5173", "deployed-url-fe"],,
    origin: "http://localhost:5173",
    credentials: true, //? for cookies
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(express.json());

// middleware section 
// these are global middlware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//! this middelware is for the cookies we a re using in the jwt authenication in controller ]
//using this middleawer we will get a new method in res object ====  res.cookie
app.use(cookieParser())

// we are useing Routes in the middelware 

//! api versioning --> version
//! api versioning --> version
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/admin", authenticate, authorize, adminRoutes);



// we are adding api versioning inside the middleware of Router
// monday today api versioning 
//^ app.use("",userRoutes)

app.get("/",(res)=>{
    res.send("working")
});

// always use error middleware just befoe the app.listen 
app.use(errorHandler)


app.listen (PORT,(err)=>{
    if(err) console.log(err);

    console.log("server running ")
})