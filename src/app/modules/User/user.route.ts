import { Router } from "express";
import { UserController } from "./user.controller";
import validateData from "../../middlewares/validateData";
import { userRegisterValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateData(userRegisterValidationSchema),
  UserController.register
);

export const UserRouter = router;
