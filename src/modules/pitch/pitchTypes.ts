import { z } from "zod";
import { AdditionalInfoSchema, PitchSchema } from "./pitchSchema";
import { UserType } from "./pitchEnums";

export type Pitch = {
  id: string;
  audience: UserType[];
  link: string;
  header: string;
  description: string;
  user: {
    id: string;
    fullName: string;
    additionalInfo: {
      firstName: string;
      lastName: string;
      website: string;
      role: { name: string; id: string };
      genres: { name: string; id: string }[];
    };
  };
};

export type IndustryRole = {
  id: string;
  name: string;
  type: UserType;
};

export type Genre = {
  id: string;
  name: string;
};

export type RadioOption<T extends string = string> = {
  id: T;
  name: string;
};

export type AdditionalInfo = {
  type: UserType;
  website: string;
  firstName: string;
  lastName: string;
  company: string;
  location: string;
  job: string;
  genreIds: string[];
  roleId: string;
};

export type AdditionalInfoForm = z.infer<typeof AdditionalInfoSchema>;
export type PitchForm = z.infer<typeof PitchSchema>;
