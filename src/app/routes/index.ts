import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { TripRouter } from "../modules/Trip/trip.route";

const router = Router();

const allRouters = [UserRouter, TripRouter];

allRouters.forEach((route) => router.use(route));

export const BaseRouter = router;
