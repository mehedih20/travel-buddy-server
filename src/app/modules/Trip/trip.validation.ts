import { z } from "zod";

const createTripValidationSchema = z.object({
  destination: z.string(),
  description: z.string(),
  travelType: z.string(),
  activities: z.array(z.string()),
  itinerary: z.array(z.string()),
  imageLinks: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number(),
});

const updateTripValidationSchema = z.object({
  destination: z.string().optional(),
  description: z.string().optional(),
  travelType: z.string().optional(),
  activities: z.array(z.string()).optional(),
  itinerary: z.array(z.string()).optional(),
  imageLinks: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().optional(),
});

export { createTripValidationSchema, updateTripValidationSchema };
