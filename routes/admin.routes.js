import { Router } from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/admin.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { updatedUserSchema } from "../validators/user.validator.js";

const router = Router();

router.get("/all", getUsers);

router.patch("/update/:id", validateBody(updatedUserSchema), updateUser); //TODO:

router.delete("/delete/:id", deleteUser); //TODO:

export default router;