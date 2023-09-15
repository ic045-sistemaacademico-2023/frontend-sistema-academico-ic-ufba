import React, { forwardRef } from "react";
import ReactInputMask from "react-input-mask";

const InputField = forwardRef(
  (
    {
      type,
      id,
      name,
      required,
      placeholder,
      label,
      error,
      mask = null,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="mb-5">
        {label && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left"
            htmlFor={name}
          >
            {label}:
          </label>
        )}
        <ReactInputMask
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-primary-400 focus:border-primary-400 focus:outline-none block w-full p-2.5"
          type={type}
          name={name}
          mask={mask}
          id={id}
          required={required}
          placeholder={placeholder}
          {...rest}
          ref={ref}
        />

        {error && (
          <p className="mt-2 text-sm text-left ml-1 text-red-600 dark:text-red-500">
            <span className="font-medium">{error}</span>
          </p>
        )}
      </div>
    );
  },
);

export default InputField;
