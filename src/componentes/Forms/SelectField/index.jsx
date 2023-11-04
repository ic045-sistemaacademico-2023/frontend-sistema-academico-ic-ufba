import { forwardRef } from "react";

const SelectField = forwardRef(
  (
    {
      type,
      id,
      name,
      placeholder,
      label,
      options,
      error,
      currentValue,
      ...rest
    },
    ref,
  ) => {
    const isFirstOptionSelected = currentValue === "";

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
        <select
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            isFirstOptionSelected ? "text-opacity-50" : ""
          }`}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          {...rest}
          ref={ref}
        >
          <option key="" value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-2 text-sm text-left ml-1 text-red-600 dark:text-red-500">
            <span className="font-medium">{error}</span>
          </p>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
