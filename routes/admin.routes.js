import { Router } from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/admin.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { userUpdatedSchema } from "../validators/user.validator.js";

const router = Router();

router.get("/all", getUsers);
router.patch("/update/:id", validateBody(userUpdatedSchema), updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
