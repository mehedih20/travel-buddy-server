import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { TripRouter } from "../modules/Trip/trip.route";
import { TravelBuddyRouter } from "../modules/TravelBuddy/travelBuddy.route";

const router = Router();

const allRouters = [UserRouter, TripRouter, TravelBuddyRouter];

allRouters.forEach((route) => router.use(route));

export const BaseRouter = router;
