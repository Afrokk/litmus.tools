import "./InputField.sass";
import { useEffect, useState } from "react";

type InputFieldProps = {
  label: string;
  fieldType: "POSTCODE" | "AMOUNT" | "PERCENTAGE" | "TEXT";
  required: boolean;
  id: string;
  data: (value: string, id?: string) => void 
};

const InputField = ({
  label,
  fieldType,
  required,
  data,
  id,
}: InputFieldProps): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [inFocus, setInFocus] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(validateInput());

    /* Passes the user's value to BudgetingList component
    by calling the data function, passing the current value. */

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

    /* Calls handleChildData in BudgetingList 
    with selected element's ID */

    data(value, e.target.id);
  };

  const handleBlur = (): void => {
    setInFocus(false);
    if (fieldType === "AMOUNT" || fieldType === "PERCENTAGE") {
      setValue(formatInput());
    }
  };

  const handleFocus = (): void => {
    setInFocus(true);
  };

  const validateInput = (): boolean =>
    fieldType === "TEXT" ||
    !value ||
    (required && VALIDATOR[fieldType].test(value)) ||
    (!required && !!value && VALIDATOR[fieldType].test(value));

  const formatInput = (): string => {
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
      }`}
    >
      <input
        id={id}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
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
  id: null
};

const VALIDATOR: { [key: string]: RegExp } = {
  POSTCODE: /^\d{5}$/,
  AMOUNT: /^\$?\d{1,7}$/,
  PERCENTAGE: /^\d{1,3}%?$/,
};

export default InputField;
