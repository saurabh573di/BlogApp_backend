
import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  deleteBlogImage,
  generateDescription,
  getBlog,
  getBlogs,
  updateBlogDetails,
  updateImage,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  addBlogSchema,
  generateDescriptionSchema,
  updateBlogSchema,
} from "../validators/blog.validator.js";

const router = Router();

router.post(
  "/add",
  authenticate,
   upload.single("image"),
  validateBody(addBlogSchema),
 
  addBlog,
);

router.post(
  "/generate-description",
  authenticate,
  validateBody(generateDescriptionSchema),
  generateDescription,
);

router.get("/all", getBlogs);
router.get("/:id", getBlog);

router.patch(
  "/edit-blog/:id",
  authenticate,
   upload.none(),
  validateBody(updateBlogSchema),
 
  updateBlogDetails,
);

router.patch(
  "/edit-image/:id",
  authenticate,
  upload.single("image"),
  updateImage,
);


router.patch("/delete-image/:id", authenticate, deleteBlogImage);



router.delete("/delete-blog/:id", authenticate, deleteBlog);

export default router;
