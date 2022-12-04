import "./DropdownField.sass";
import { useEffect, useState } from "react";

type DropdownFieldProps = {
  label: string;
  id: string;
  name: string;
  defaultSelected: string;
  options: string[];
  required: boolean;
  data: (value: string, e?: React.ChangeEvent<HTMLSelectElement>) => void 
};

const DropdownField = ({
  label,
  id,
  name,
  defaultSelected,
  options,
  required,
  data,
}: DropdownFieldProps): JSX.Element => {
  let choices = [];
  const [value, setValue] = useState<string>(defaultSelected || "");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [inFocus, setInFocus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (data) {
      data(value, e);
    }
  }

  const handleBlur = (): void => {
    setInFocus(false);
    setIsTouched(true);
  };

  const handleFocus = (): void => {
    setInFocus(true);
  };

  const validateOption = (): boolean => !required || !!value;

  useEffect(() => {
    setIsValid(validateOption());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!defaultSelected) {
    choices.push(<option key={0} value={""} hidden disabled></option>);
  }
  choices = [
    ...choices,
    ...options.map((o, idx) => (
      <option key={idx + 1} value={o}>
        {" "}
        {o}{" "}
      </option>
    )),
  ];
  return (
    <div
      className={`dropdown-field-component 
    ${isValid && required && inFocus ? "success" : isTouched && !isValid ? "error" : ""}
    ${!!defaultSelected && isTouched ? "success" : ""}`}
    >
      <select
        id={id}
        name={name}
        defaultValue={defaultSelected}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
      >
        {choices}
      </select>
      <label className={value && "in-focus"}> {label} </label>
    </div>
  );
};
DropdownField.defaultProps = {
  label: "",
  id: "",
  name: "",
  defaultSelected: "",
  options: [],
  required: false,
  data: null
};

export default DropdownField;
