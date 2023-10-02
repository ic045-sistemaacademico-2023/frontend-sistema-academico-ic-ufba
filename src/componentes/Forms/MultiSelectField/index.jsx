import { forwardRef } from "react";

const MultiCheckboxField = forwardRef(
  ({ id, name, label, options, error, ...rest }, ref) => {
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
            <div
              key={option.id}
              className="flex items-center mb-2 mr-4 p-0.5 rounded-lg"
            >
              <input
                className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-3xl focus:ring-blue-500`}
                type="checkbox"
                id={`${id}_${option.value}`}
                name={name}
                value={option.value}
                {...rest}
                ref={ref}
              />
              <label
                className="ml-2 text-sm font-medium text-gray-900"
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
