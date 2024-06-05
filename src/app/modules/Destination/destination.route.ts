import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateData from "../../middlewares/validateData";
import { destinationValidationSchema } from "./destination.validation";
import { DestinationController } from "./destination.controller";

const router = Router();

router.post(
  "/destination",
  auth("admin"),
  validateData(destinationValidationSchema),
  DestinationController.createDestination,
);

router.get("/destinations", DestinationController.getDestinations);

router.delete(
  "/destination/:destinationId",
  auth("admin"),
  DestinationController.deleteDestination,
);

export const DestinationRouter = router;
