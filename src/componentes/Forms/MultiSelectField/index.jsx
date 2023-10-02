import { forwardRef } from "react";

const MultiCheckboxField = forwardRef(
  (
    {
      id,
      name,
      label,
      options,
      error,
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
        <div className="flex">
          {options.map((option) => (
            <div key={option.id} className="flex items-center mb-2 mr-4 p-0.5">
              <input
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-auto p-2.5`}
                type="checkbox"
                id={`${id}_${option.value}`}
                name={name}
                value={option.value}
                {...rest}
                ref={ref}
              />
              <label
                className="mb-2 mt-2 text-sm font-medium text-gray-900 ml-0.5"
                htmlFor={`${id}_${option.value}`}
              >
                {option.name}
              </label>
            </div>
          ))}
          {error && (
            <p className="mt-2 text-sm text-left ml-1 text-red-600 dark:text-red-500">
              <span className="font-medium">{error}</span>
            </p>
          )}
        </div>

      </div>
    );
  },
);

export default MultiCheckboxField;
