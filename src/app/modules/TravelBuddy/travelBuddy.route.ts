import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { TravelBuddyController } from "./travelBuddy.controller";

const router = Router();

router.post(
  "/trip/:tripId/request",
  auth(),
  TravelBuddyController.sendTravelBuddyRequest
);

router.get(
  "/travel-buddies/:tripId",
  auth(),
  TravelBuddyController.getTravelBuddies
);

router.put(
  "/travel-buddies/:buddyId/respond",
  auth(),
  TravelBuddyController.updateTravelBuddyRequest
);

export const TravelBuddyRouter = router;
