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
  TripController.createTrip
);

router.get("/trips", TripController.getTrips);

export const TripRouter = router;
