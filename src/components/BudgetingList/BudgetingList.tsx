import { useState } from "react";
import InputField from "../InputField/InputField";
import svg from '../../assets/x-lg.svg';
import "./BudgetingList.sass";

const BudgetingList = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [label, setLabel] = useState<string>("ADD MORE +");
  const [fields, setFields] = useState<Array<string>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleFocus = (): void => {
    setLabel("Enter New Item:");
  };


  const handleBlur = (): void => {
    setLabel("ADD MORE +");
    setValue("");
  };

  const addField = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") {
      setFields([...fields, value]);
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  const removeField = (index: number): void => {
    let data = [...fields];
    data.splice(index, 1);
    setFields(data);
  };

  return (
    <div className="budgeting-list-component">
      <ul className="budgeting-list">
        <li>
          <InputField
            label="Student Loans (%)"
            fieldType="PERCENTAGE"
            required={true}
          />
        </li>
        <li>
          <InputField
            label="Rent/Mortgage"
            fieldType="AMOUNT"
            required={true}
          />
        </li>
        <li>
          <InputField label="Internet" fieldType="AMOUNT" required={true} />
        </li>
        <li>
          <InputField label="Electricity" fieldType="AMOUNT" required={true} />
        </li>
        <li>
          <InputField
            label="Health Insurance"
            fieldType="AMOUNT"
            required={true}
          />
        </li>
        <li>
          <InputField label="Groceries" fieldType="AMOUNT" required={true} />
        </li>
        {fields.map((field, index) => (
          <li key={index} className="list-input-field">
            <InputField label={field} fieldType="TEXT" />
            <img className="remove-icon" src={svg} onClick={() => removeField(index)} alt="Remove a field."/>
          </li>
        ))}
        <li>
          <div className="input-field-component">
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              onKeyUp={addField}
            />
            <label className={value && "in-focus"}>{label}</label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BudgetingList;
