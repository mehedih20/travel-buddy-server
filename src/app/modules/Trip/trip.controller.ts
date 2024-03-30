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

export const TripController = {
  createTrip,
};
