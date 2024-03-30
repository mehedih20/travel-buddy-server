import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { TravelBuddyController } from "./travelBuddy.controller";

const router = Router();

router.post("/trip/:tripId/request", auth(), TravelBuddyController.createTrip);

export const TravelBuddyRouter = router;
