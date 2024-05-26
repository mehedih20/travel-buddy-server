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
};
