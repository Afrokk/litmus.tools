import { useState } from "react";
import InputField from "../InputField/InputField";
import "./BudgetingList.sass";

const BudgetingList = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [label, setLabel] = useState<string>("ADD MORE +");
  const [Fields, setFields] = useState<Array<string>>([]);

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
      setFields([...Fields, value]);
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  const removeField = (index: number): void => {
    let data = [...Fields];
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
            formatting={true}
            required={true}
          />
        </li>
        <li>
          <InputField
            label="Rent/Mortgage"
            fieldType="AMOUNT"
            formatting={true}
            required={true}
          />
        </li>
        <li>
          <InputField
            label="Internet"
            fieldType="AMOUNT"
            formatting={true}
            required={true}
          />
        </li>
        <li>
          <InputField
            label="Electricity"
            fieldType="AMOUNT"
            formatting={true}
            required={true}
          />
        </li>
        <li>
          <InputField
            label="Health Insurance"
            fieldType="AMOUNT"
            formatting={true}
            required={true}
          />
        </li>
        <li>
          <InputField
            label="Groceries"
            fieldType="AMOUNT"
            formatting={true}
            required={true}
          />
        </li>
        {Fields.map((field, index) => {
          return (
            <li key={index} className="new-field">
              <InputField label={field} fieldType="TEXT" />
              <svg
                onClick={() => removeField(index)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="rgb(214, 214, 214)"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </li>
          );
        })}
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
