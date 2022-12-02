import "./InputField.sass";
import { useEffect, useState } from "react";

type InputFieldProps = {
  label: string;
  fieldType: "POSTCODE" | "AMOUNT" | "PERCENTAGE" | "TEXT" | string;
  required: boolean;
  id: string;
  className: string;
  passValue: string;
  name: string;
  data: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void 
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  fieldType,
  required,
  data,
  id,
  className,
  passValue,
  name,
  onBlur,
}: InputFieldProps): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [inFocus, setInFocus] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(validateInput(passValue ? passValue : value));
    
    if (data === null) {
      return;
    }
    else if (!!value) {
      data(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);

    if (data != null) {
      data(value, e);
    }
  };

  const handleBlur = (e: any): void => {
    setInFocus(false);
    if (fieldType === "AMOUNT" || fieldType === "PERCENTAGE") {
      setValue(formatInput(value));
      if (onBlur) {
        onBlur(e);
      }
    }
  };

  const handleFocus = (): void => {
    setInFocus(true);
  };

  const validateInput = (value: string): boolean =>
    fieldType === "TEXT" ||
    !value ||
    (required && VALIDATOR[fieldType].test(value)) ||
    (!required && !!value && VALIDATOR[fieldType].test(value));

  const formatInput = (value: string): string => {
    if (fieldType === "AMOUNT" && !value.includes("$") && value !== "") {
      return `$${value}`;
    } else if (
      fieldType === "PERCENTAGE" &&
      !value.includes("%") &&
      value !== ""
    ) {
      return `${value}%`;
    } else {
      return value;
    }
  };

  return (
    <div
      className={`input-field-component ${
        (!isValid && "error") ||
        (!value && " ") ||
        (isValid && fieldType !== "TEXT" && inFocus && "success")
      } ${className}`}
    >
      <input
        id={id}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={passValue ? passValue : value}
        name={name}
      />
      <label className={value && "in-focus"}>{label}</label>
    </div>
  );
};

InputField.defaultProps = {
  label: "",
  fieldType: "TEXT",
  required: false,
  data: null,
  id: null,
  className: "",
  passValue: null,
  name: null,
  onBlur: null,
};

const VALIDATOR: { [key: string]: RegExp } = {
  POSTCODE: /^\d{5}$/,
  AMOUNT: /^\$?\d{1,7}$/,
  PERCENTAGE: /^\d{1,3}%?$/,
};

export default InputField;
