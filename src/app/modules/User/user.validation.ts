import { z } from "zod";

const userRegisterValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  role: z.string().optional(),
  photoUrl: z.string().optional(),
  password: z.string(),
  profile: z
    .object({
      bio: z.string().optional(),
      age: z.number().optional(),
    })
    .optional(),
});

const userLoginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const updateUserProfileValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  role: z.string().optional(),
  profile: z
    .object({
      bio: z.string().optional(),
      age: z.number().optional(),
    })
    .optional(),
});

const updateUserPhotoValidationSchema = z.object({
  photoUrl: z.string(),
});

export {
  userRegisterValidationSchema,
  userLoginValidationSchema,
  updateUserProfileValidationSchema,
  updateUserPhotoValidationSchema,
};
