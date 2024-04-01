import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { TravelBuddyController } from "./travelBuddy.controller";
import validateData from "../../middlewares/validateData";
import {
  travelBuddyRequestValidationSchema,
  travelBuddyResponseValidationSchema,
} from "./travelBuddy.validation";

const router = Router();

router.post(
  "/trip/:tripId/request",
  auth(),
  validateData(travelBuddyRequestValidationSchema),
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
  validateData(travelBuddyResponseValidationSchema),
  TravelBuddyController.updateTravelBuddyRequest
);

export const TravelBuddyRouter = router;
