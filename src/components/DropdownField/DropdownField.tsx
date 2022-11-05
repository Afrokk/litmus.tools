import "./DropdownField.sass";
import { useEffect, useState } from "react";

type DropdownFieldProps = {
  label: string;
  id: string;
  defaultSelected: string;
  options: string[];
  required: boolean;
};

const DropdownField = ({
  label,
  id,
  defaultSelected,
  options,
  required,
}: DropdownFieldProps): JSX.Element => {
  let choices = [];
  const [value, setValue] = useState<string>(defaultSelected || "");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  }

  const handleBlur = (): void => {
    setIsTouched(true);
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
    ${isValid && required ? "success" : isTouched && !isValid ? "error" : ""}
    ${!!defaultSelected && isTouched ? "success" : ""}`}
    >
      <select
        id={id}
        defaultValue={defaultSelected}
        onChange={handleChange}
        onBlur={handleBlur}
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
  defaultSelected: "",
  options: [],
  required: false,
};

export default DropdownField;
