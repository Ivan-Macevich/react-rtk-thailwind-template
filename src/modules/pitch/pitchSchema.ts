import { z } from "zod";
import { Audience, UserType } from "./pitchEnums";

export const idSchema = z.string().length(24, { message: "Field is required" });

export const AdditionalInfoSchema = z.object({
  roleId: idSchema,
  genreIds: idSchema.array().min(1),
  type: z.nativeEnum(UserType),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  job: z.string().min(3),
  company: z.string().min(3),
  website: z
    .string()
    .regex(
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
      "Should be valid url",
    ),
  location: z.string().min(3),
});

export const PitchSchema = z.object({
  type: z.nativeEnum(Audience),
  header: z.string().min(10).max(100),
  description: z.string().min(10).max(240),
  link: z
    .string()
    .regex(
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
      "Should be valid url",
    ),
});
