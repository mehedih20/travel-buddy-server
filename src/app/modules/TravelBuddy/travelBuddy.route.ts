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
  "/trip/request",
  auth("user"),
  validateData(travelBuddyRequestValidationSchema),
  TravelBuddyController.sendTravelBuddyRequest,
);

router.get(
  "/travel-buddies/:tripId",
  auth("admin"),
  TravelBuddyController.getTravelBuddies,
);

router.get(
  "/buddy-request",
  auth("admin"),
  TravelBuddyController.getAllBuddyRequest,
);

router.put(
  "/travel-buddies/:buddyId/respond",
  auth("admin"),
  validateData(travelBuddyResponseValidationSchema),
  TravelBuddyController.updateTravelBuddyRequest,
);

router.get(
  "/user/buddy-request",
  auth("user"),
  TravelBuddyController.getSingleUserBuddyRequest,
);

router.get(
  "/user/check-request/:tripId",
  auth("user"),
  TravelBuddyController.checkBuddyRequest,
);

export const TravelBuddyRouter = router;
