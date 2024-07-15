import { RadioOption } from "./pitchTypes";
import { Audience, UserType } from "./pitchEnums";

export const typeRadioOptions: RadioOption<Audience>[] = [
  { id: UserType.PROFESSIONAL, name: "Professionals" },
  { id: UserType.COMPANY, name: "Companies" },
  { id: Audience.BOTH, name: "Both (Recommended)" },
];
