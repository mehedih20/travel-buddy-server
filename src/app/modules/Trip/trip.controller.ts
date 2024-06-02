import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TripServices } from "./trip.services";

const createTrip = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await TripServices.createTripIntoDb(token as string, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "Trip created successfully",
    data: result,
  });
});

const getTrips = catchAsync(async (req, res) => {
  const query = req.query;
  const { meta, data } = await TripServices.getTripsFromDb(query);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Trips retrieved successfully",
    meta,
    data,
  });
});

const getSingleTrip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TripServices.getSingleTrip(id);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Trip retrieved successfully",
    data: result,
  });
});

const getTripsCreatedByUser = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await TripServices.getTripsCreatedByUserFromDb(
    token as string,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User trips retrieved successfully",
    data: result,
  });
});

const updateTrip = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const result = await TripServices.updateTripInDb(tripId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Trip updated successfully",
    data: result,
  });
});

const deleteUserTrip = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { tripId } = req.params;
  const result = await TripServices.deleteUserTripFromDb(
    token as string,
    tripId,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Trip deleted successfully",
    data: result,
  });
});

const getTravelTypes = catchAsync(async (req, res) => {
  const result = await TripServices.getTravelTypes();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Travel types retrieved successfully",
    data: result,
  });
});

export const TripController = {
  createTrip,
  getTrips,
  getSingleTrip,
  getTravelTypes,
  getTripsCreatedByUser,
  deleteUserTrip,
  updateTrip,
};
