import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TravelBuddyServices } from "./travelBuddy.services";

const sendTravelBuddyRequest = catchAsync(async (req, res) => {
  const result = await TravelBuddyServices.sendTravelBuddyRequestIntoDb(
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "Travel buddy request sent successfully",
    data: result,
  });
});

const getTravelBuddies = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const result = await TravelBuddyServices.getTravelBuddiesFromDb(tripId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Potential travel buddies retrieved successfully",
    data: result,
  });
});

const updateTravelBuddyRequest = catchAsync(async (req, res) => {
  const { buddyId } = req.params;
  const result = await TravelBuddyServices.updateTravelBuddyRequestIntoDb(
    buddyId,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Travel buddy request responded successfully",
    data: result,
  });
});

export const TravelBuddyController = {
  sendTravelBuddyRequest,
  getTravelBuddies,
  updateTravelBuddyRequest,
};
