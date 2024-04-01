import { z } from "zod";

const travelBuddyResponseValidationSchema = z.object({
  tripId: z.string(),
  status: z.string(),
});

const travelBuddyRequestValidationSchema = z.object({
  userId: z.string(),
});

export {
  travelBuddyResponseValidationSchema,
  travelBuddyRequestValidationSchema,
};
