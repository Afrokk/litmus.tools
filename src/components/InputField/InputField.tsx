import "./InputField.sass";
import { useEffect, useState } from "react";

type InputFieldProps = {
  label: string;
  fieldType: "POSTCODE" | "AMOUNT" | "PERCENTAGE" | "TEXT";
  required: boolean;
};

const InputField = ({
  label,
  fieldType,
  required,
}: InputFieldProps): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [inFocus, setInFocus] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(validateInput());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleBlur = (): void => {
    setInFocus(false);
  };

  const handleFocus = (): void => {
    setInFocus(true);
  };

  const validateInput = (): boolean =>
    fieldType === "TEXT" ||
    !value ||
    (required && VALIDATOR[fieldType].test(value)) ||
    (!required && !!value && VALIDATOR[fieldType].test(value));

  return (
    <div
      className={`input-field-component ${
        (!isValid && "error") ||
        (!value && " ") ||
        (isValid && fieldType !== "TEXT" && inFocus && "success")
      }`}
    >
      <input onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}/>
      <label className={value && "in-focus"}>{label}</label>
    </div>
  );
};

InputField.defaultProps = {
  label: "",
  fieldType: "TEXT",
  required: false,
};

const VALIDATOR: { [key: string]: RegExp } = {
  POSTCODE: /^\d{5}$/,
  AMOUNT: /^\d{1,7}$/,
  PERCENTAGE: /^\d{1,3}%$/,
};

export default InputField;
