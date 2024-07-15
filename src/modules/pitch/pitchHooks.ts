import { useForm } from "react-hook-form";
import { AdditionalInfo, AdditionalInfoForm, PitchForm } from "./pitchTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdditionalInfoSchema, PitchSchema } from "./pitchSchema";
import { Audience, UserType } from "./pitchEnums";

const additionalInfoDefaultValues: Partial<AdditionalInfoForm> = {
  type: UserType.PROFESSIONAL,
};

export function useAdditionalInfoForm(
  additionalInfo: AdditionalInfo | null | undefined,
) {
  return useForm<AdditionalInfoForm>({
    defaultValues: additionalInfo
      ? additionalInfo
      : additionalInfoDefaultValues,
    resolver: zodResolver(AdditionalInfoSchema),
  });
}

const pitchDefaultValues: Partial<PitchForm> = {
  type: Audience.BOTH,
  header: "",
  description: "",
  link: "",
};

export function usePitchForm() {
  return useForm<PitchForm>({
    defaultValues: pitchDefaultValues,
    resolver: zodResolver(PitchSchema),
  });
}
