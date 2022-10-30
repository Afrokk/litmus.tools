import "./InputField.sass";
import { useState } from 'react';

type InputFieldProps = {
  label: string;
  type: string;
  maxLength: number;
  required: boolean;
  pattern: string;
};

const InputField = ({
  label,
  type,
  maxLength,
  required,
  pattern
}: InputFieldProps): JSX.Element => {

  const [value, setValue] = useState('');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="inputField">
      <input 
        type={type}
        maxLength={maxLength}
        required={required}
        onChange={handleChange}
        pattern={pattern}
      />
      <label className={value && 'containsText'}> {label} </label>
    </div>
  );
};

InputField.defaultProps = {
  label: "",
  type: "text",
  maxLength: 64,
  required: false,
  pattern: ""
};

export default InputField;
