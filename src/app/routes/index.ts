import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";

const router = Router();

const allRouters = [UserRouter];

allRouters.forEach((route) => router.use(route));

export const BaseRouter = router;
