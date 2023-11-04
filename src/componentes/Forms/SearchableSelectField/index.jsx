import { forwardRef } from "react";
import Select from "react-select";

const SearchableSelectField = forwardRef(function SearchableSelectField(
  { options, label, error, onChange, ...rest },
  ref,
) {
  const selectOptions = options.map((option) => ({
    value: option.value,
    label: option.name,
  }));

  const handleChange = (selectedOption) => {
    const event = {
      target: {
        name: rest.name,
        value: selectedOption ? selectedOption.value : "",
      },
    };
    onChange(event);
  };

  return (
    <div className="mb-5">
      {label && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left"
          htmlFor={rest.name}
        >
          {label}:
        </label>
      )}
      <Select
        className="basic-single text-left text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0.5"
        classNamePrefix="select"
        isSearchable={true}
        name={rest.name}
        options={selectOptions}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
      {error && (
        <p className="mt-2 text-sm text-left ml-1 text-red-600 dark:text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  );
});

SearchableSelectField.displayName = "SearchableSelectField";

export default SearchableSelectField;
