import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import { RadioOption } from "../modules/pitch";

type Props = {
  legend: string;
  description: string;
  className?: string;
  options: RadioOption[];
} & InputHTMLAttributes<HTMLInputElement>;

export const RadioButton = React.forwardRef<HTMLInputElement, Props>(
  ({ className, legend, description, options, ...props }: Props, ref) => {
    return (
      <div className={classNames(className)}>
        <legend className="mt-5 text-sm font-semibold leading-6 text-gray-900">
          {legend}
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
        <div className="mt-6 space-y-6">
          {options.map(({ name, id }) => (
            <div key={id} className="flex items-center gap-x-3">
              <input
                ref={ref}
                {...props}
                id={id}
                type="radio"
                value={id}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
