import ReactInputMask from "react-input-mask";

const InputField = ({
  onChange,
  onBlur,
  value,
  type,
  id,
  name,
  required,
  placeholder,
  label,
  error,
  mask = null,
}) => {
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5"
        type={type}
        mask={mask}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <p className="mt-2 text-sm text-left ml-1 text-red-600 dark:text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
