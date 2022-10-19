import "./InputField.sass";

type InputFieldProps = {
  label?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
};

const InputField = ({
  label,
  type,
  maxLength,
  placeholder,
  required,
}: InputFieldProps): JSX.Element => {
  return (
    <div className="InputField">
      <label>{label}</label>
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

InputField.defaultProps = {
  label: "",
  type: "text",
  maxLength: 64,
  placeholder: "",
  required: false,
};

export default InputField;
