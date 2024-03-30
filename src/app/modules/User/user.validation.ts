import { z } from "zod";

const userRegisterValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  profile: z.object({
    bio: z.string(),
    age: z.number(),
  }),
});

const userLoginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { userRegisterValidationSchema, userLoginValidationSchema };
