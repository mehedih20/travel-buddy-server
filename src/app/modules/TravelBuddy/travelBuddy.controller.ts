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

const getSingleUserBuddyRequest = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await TravelBuddyServices.getSingleUserBuddyRequestFromDb(
    token as string,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "All buddy request fetched successfully",
    data: result,
  });
});

const checkBuddyRequest = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { tripId } = req.params;
  const result = await TravelBuddyServices.checkBuddyRequestInDb(
    token as string,
    tripId,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Buddy check result fetched successfully",
    result,
  });
});

export const TravelBuddyController = {
  sendTravelBuddyRequest,
  getTravelBuddies,
  updateTravelBuddyRequest,
  getSingleUserBuddyRequest,
  checkBuddyRequest,
};
