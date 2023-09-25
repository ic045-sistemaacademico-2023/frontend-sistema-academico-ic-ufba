import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const TextField = forwardRef(
  ({ id, name, required, placeholder, label, error, ...rest }, ref) => {
    return (
      <div className="mb-2">
        {label && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left"
            htmlFor={name}
          >
            {label}:
          </label>
        )}
        <TextareaAutosize
          minRows={3}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-primary-400 focus:border-primary-400 focus:outline-none block w-full p-2.5"
          name={name}
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

export default TextField;
