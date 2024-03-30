import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TravelBuddyServices } from "./travelBuddy.services";

const createTrip = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const { userId } = req.body;
  const result = await TravelBuddyServices.sendTravelBuddyRequestIntoDb(
    userId,
    tripId
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "Travel buddy request sent successfully",
    data: result,
  });
});

export const TravelBuddyController = {
  createTrip,
};
