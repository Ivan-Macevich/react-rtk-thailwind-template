import { Controller, Control, FieldError } from "react-hook-form";
import classNames from "classnames";

type Props = {
  className?: string;
  options: { id: string; name: string }[];
  control: Control<any>;
  error?: FieldError;
  name: string;
  label: string;
};

export function Select({
  className,
  options,
  control,
  error,
  name,
  label,
}: Props) {
  return (
    <div className={classNames(className)}>
      <label
        htmlFor="category"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <Controller
          render={({ field }) => (
            <select
              {...field}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
          control={control}
          name={name}
        />
        {error && <p className="text-xs text-red-600">{error.message}</p>}
      </div>
    </div>
  );
}
