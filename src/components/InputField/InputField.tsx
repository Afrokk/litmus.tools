import "./InputField.sass";
import { useEffect, useState } from "react";

type InputFieldProps = {
  label: string;
  fieldType:
    | "POSTCODE"
    | "AMOUNT"
    | "PERCENTAGE"
    | "TEXT"
    | "AMOUNTorPERCENTAGE"
    | string;
  required: boolean;
  id: string;
  className: string;
  passValue: string;
  name: string;
  data: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
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
    } else if (!!value) {
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
    if (
      fieldType === "AMOUNT" ||
      fieldType === "PERCENTAGE" ||
      fieldType === "AMOUNTorPERCENTAGE"
    ) {
      setValue(formatInput(value));
      if (onBlur) {
        onBlur(e);
      }
    }
  };

  const handleFocus = (): void => {
    setInFocus(true);
  };

  const validateInput = (value: string): boolean => {
    if (fieldType === "TEXT" || !value) {
      return true;
    } else if (
      fieldType === "AMOUNTorPERCENTAGE" &&
      value &&
      !(value.includes("$") && value.includes("%")) &&
      VALIDATOR[fieldType].test(value)
    ) {
      return true;
    } else if (
      (fieldType === "AMOUNT" ||
        fieldType === "PERCENTAGE" ||
        fieldType === "POSTCODE") &&
      required &&
      VALIDATOR[fieldType].test(value)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const formatInput = (value: string): string => {
    if (
      (value.includes("$") && value.includes("%")) ||
      /[a-zA-Z]/.test(value)
    ) {
      setIsValid(false);
      return value;
    }
    if (fieldType === "AMOUNT" && !value.includes("$") && value !== "") {
      return `$${value}`;
    } else if (
      fieldType === "PERCENTAGE" &&
      !value.includes("%") &&
      value !== ""
    ) {
      return `${value}%`;
    } else if (
      fieldType === "AMOUNTorPERCENTAGE" &&
      value !== "" &&
      !value.includes("$") &&
      !value.includes("%")
    ) {
      return `$${value}`;
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
        maxLength={fieldType === "TEXT" ? 128 : 13}
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
  AMOUNT: /^\$?\d{1,12}$/,
  PERCENTAGE: /^\d{1,3}%?$/,
  AMOUNTorPERCENTAGE: /^\$?\d{1,12}%?$/,
};

export default InputField;
