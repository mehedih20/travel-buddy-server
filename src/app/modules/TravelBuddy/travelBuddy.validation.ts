import { z } from "zod";

const travelBuddyResponseValidationSchema = z.object({
  tripId: z.string(),
  status: z.string(),
});

const travelBuddyRequestValidationSchema = z.object({
  userId: z.string(),
  tripId: z.string(),
  userEmail: z.string(),
  tripDestination: z.string(),
});

export {
  travelBuddyResponseValidationSchema,
  travelBuddyRequestValidationSchema,
};
