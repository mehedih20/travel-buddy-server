import { Router } from "express";
import { TripController } from "./trip.controller";
import { auth } from "../../middlewares/auth";
import validateData from "../../middlewares/validateData";
import { createTripValidationSchema } from "./trip.validation";

const router = Router();

router.post(
  "/trips",
  auth(),
  validateData(createTripValidationSchema),
  TripController.createTrip,
);

router.get("/trips", TripController.getTrips);

router.get("/trips/:id", TripController.getSingleTrip);

router.get("/user/trips", auth("user"), TripController.getTripsCreatedByUser);

router.put(
  "/update-trip/:tripId",
  auth("user", "admin"),
  TripController.updateTrip,
);

router.delete(
  "/delete-trip/:tripId",
  auth("user", "admin"),
  TripController.deleteUserTrip,
);

router.get("/travel-types", TripController.getTravelTypes);

export const TripRouter = router;
