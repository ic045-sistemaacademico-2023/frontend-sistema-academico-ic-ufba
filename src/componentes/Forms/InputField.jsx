import ReactInputMask from "react-input-mask";

const TextField = ({
  onChange,
  onBlur,
  value,
  type,
  id,
  name,
  required,
  placeholder,
  label,
  mask = null,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name}>{label}:</label>}
      <ReactInputMask
        className="bg-primary-100 rounded p-1 border-1 border-solid"
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
    </div>
  );
};

export default TextField;
