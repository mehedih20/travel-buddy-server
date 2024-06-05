import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { DestinationServices } from "./destination.services";

const createDestination = catchAsync(async (req, res) => {
  const result = await DestinationServices.createDestinationInDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "Destination added successfully",
    data: result,
  });
});

const getDestinations = catchAsync(async (req, res) => {
  const result = await DestinationServices.getDestinationsFromDb();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "Destinations fetched successfully",
    data: result,
  });
});

const deleteDestination = catchAsync(async (req, res) => {
  const { destinationId } = req.params;
  const result =
    await DestinationServices.deleteDestinationFromDb(destinationId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "Destination deleted successfully",
    data: result,
  });
});

export const DestinationController = {
  createDestination,
  getDestinations,
  deleteDestination,
};
