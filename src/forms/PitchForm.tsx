import { TextInput } from "../component/TextInput";
import { PitchForm, useSendPitchMutation } from "../modules/pitch";
import { usePitchForm } from "../modules/pitch/pitchHooks";
import { LoadingOverlay } from "../component/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../component/Textarea";
import { RadioButton } from "../component/RadioButton";
import { typeRadioOptions } from "../modules/pitch/pitchConstants";
import { AppRoute } from "../constants";

export function PitchForm() {
  const [sendPitch, { isLoading }] = useSendPitchMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = usePitchForm();

  const submitHandler = (data: PitchForm) => {
    sendPitch(data)
      .unwrap()
      .then(async () => {
        navigate(AppRoute.Root);
      });
  };

  return (
    <form className="flex-1 bg-white" onSubmit={handleSubmit(submitHandler)}>
      {isLoading && <LoadingOverlay />}
      <fieldset disabled={isLoading}>
        <div className="mx-auto max-w-[800px] space-y-12 p-6">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Whats's your story?
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Write a catchy header (up to 100 symbols) and a paragraph with the
              most important information (up to 240 symbols).
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <Textarea
                {...register("header")}
                hint="Write a catchy header (up to 100 symbols)"
                error={errors.header}
                label="Header"
                className="col-span-full"
              />

              <Textarea
                {...register("description")}
                hint="White a paragraph with the
              most important information (up to 240 symbols)"
                error={errors.description}
                label="Description"
                className="col-span-full"
              />

              <RadioButton
                options={typeRadioOptions}
                legend="Choose your audience"
                description="An individual or organization."
                className="col-span-full"
                {...register("type")}
              />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                {...register("link")}
                error={errors.link}
                label="Link to your deck or press release"
                className="sm:col-span-3"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
