import "./DropdownField.sass";
import { useState } from 'react';

type DropdownFieldProps = {
  label: string;
  id: string;
  defaultSelected: string;
  options: string[];
};

const DropdownField = ({
  label,
  id,
  defaultSelected,
  options,
}: DropdownFieldProps): JSX.Element => {
  let choices = [];
  const [value, setValue] = useState(defaultSelected || '');
  
  function handleChange(e: any) {
    setValue(e.target.value);
  }

  if (!defaultSelected) {
    choices.push(<option key={0} value={""} hidden disabled> {""} </option>)
  }
  choices = [
    ...choices,
    ...options.map((o, idx) => 
      <option key={idx+1} value={o}> {o} </option>
    )
  ]
  return (
    <div className="dropdown-field-component">
        <select 
          id={id} 
          defaultValue={defaultSelected} 
          onChange={handleChange}
        >
          {choices}
        </select>
        <label className={(value && 'in-focus')}> {label} </label>
    </div>
  );
};
DropdownField.defaultProps = {
  label: "",
  id: "",
  defaultSelected: "",
  options: [],
};

export default DropdownField;
