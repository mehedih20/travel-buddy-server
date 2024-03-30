import prisma from "../../utils/prisma";

const sendTravelBuddyRequestIntoDb = async (userId: string, tripId: string) => {
  const result = await prisma.travelBuddyRequest.create({
    data: {
      userId,
      tripId,
    },
  });

  return result;
};

export const TravelBuddyServices = {
  sendTravelBuddyRequestIntoDb,
};
