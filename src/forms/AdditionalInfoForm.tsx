import { TextInput } from "../component/TextInput";
import {
  AdditionalInfo,
  AdditionalInfoForm,
  Genre,
  IndustryRole,
  useAddAdditionalInfoMutation,
} from "../modules/pitch";
import { Select } from "../component/Select";
import { MultiSelect } from "../component/MultiSelect";
import { useEffect, useState } from "react";
import { useAdditionalInfoForm } from "../modules/pitch/pitchHooks";
import { LoadingOverlay } from "../component/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../constants";
import { findProfile } from "../modules/user";
import { useAppDispatch } from "../hooks";
import { UserType } from "../modules/pitch/pitchEnums";

type Props = {
  genres: Genre[];
  roles: IndustryRole[];
  additionalInfo: AdditionalInfo | null | undefined;
};

export function AdditionalInfoForm({ genres, roles, additionalInfo }: Props) {
  const [addAdditionalInfo, { isLoading }] = useAddAdditionalInfoMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useAdditionalInfoForm(additionalInfo);

  const userType = watch("type");
  const roleId = watch("roleId");
  const [filteredRoles, setFilteredRoles] = useState(
    roles.filter((role) => role.type === UserType.PROFESSIONAL),
  );

  useEffect(() => {
    const newRoles = roles.filter((role) => role.type === userType);

    if (!additionalInfo || additionalInfo.roleId !== roleId) {
      setValue("roleId", newRoles.length ? newRoles[0].id : "");
    }

    setFilteredRoles(newRoles);
  }, [roles, setValue, userType]);

  const submitHandler = (data: AdditionalInfoForm) => {
    addAdditionalInfo(data)
      .unwrap()
      .then(async () => {
        await dispatch(findProfile()).unwrap();
        navigate(AppRoute.Root);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {isLoading && <LoadingOverlay />}
      <fieldset disabled={isLoading}>
        <div className="mx-auto min-h-screen max-w-[800px] space-y-12 bg-white p-6">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Additional Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed in addition to your pitches
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                {...register("firstName")}
                error={errors.firstName}
                label="First name"
                className="sm:col-span-3"
              />
              <TextInput
                {...register("lastName")}
                error={errors.lastName}
                label="Last name"
                className="sm:col-span-3"
              />

              <div className="col-span-full">
                <legend className="mt-5 text-sm font-semibold leading-6 text-gray-900">
                  Entity
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  An individual or organization.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      {...register("type")}
                      id="type-professional"
                      type="radio"
                      value={UserType.PROFESSIONAL}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="type-professional"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Professional
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      {...register("type")}
                      id="type-company"
                      type="radio"
                      value={UserType.COMPANY}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="type-company"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company
                    </label>
                  </div>
                </div>
              </div>

              <Select
                options={filteredRoles}
                control={control}
                name="roleId"
                className="sm:col-span-3"
                error={errors.roleId}
                label="Professional Field"
              />

              <div className="sm:col-span-3">
                <MultiSelect
                  selectedItems={
                    additionalInfo
                      ? genres.filter((genre) =>
                          additionalInfo.genreIds.includes(genre.id),
                        )
                      : genres.slice(0, 1)
                  }
                  items={genres}
                  label="Activity"
                  onChange={(genres) => {
                    setValue(
                      "genreIds",
                      genres.map((genre) => genre.id),
                    );
                  }}
                />

                {errors.genreIds && (
                  <p className="text-xs text-red-600">
                    {errors.genreIds.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                {...register("job")}
                error={errors.job}
                label="Job Title"
                className="sm:col-span-3"
              />
              <TextInput
                {...register("company")}
                error={errors.company}
                label="Company Name"
                className="sm:col-span-3"
              />
              <TextInput
                {...register("location")}
                error={errors.location}
                label="Location"
                className="sm:col-span-3"
              />
              <TextInput
                {...register("website")}
                error={errors.website}
                label="Website"
                className="sm:col-span-3"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {additionalInfo && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            )}

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
