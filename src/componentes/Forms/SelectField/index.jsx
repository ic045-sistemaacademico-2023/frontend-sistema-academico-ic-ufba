const SelectField = ({
  onChange,
  onBlur,
  type,
  id,
  name,
  value,
  required,
  placeholder,
  label,
  options,
  error,
}) => {
  const isFirstOptionSelected = value === "";

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
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        <option value="" disabled>
          Selecione um cargo
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
};

export default SelectField;
