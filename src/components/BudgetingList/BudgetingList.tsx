import { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import svg from "../../assets/x-lg.svg";
import "./BudgetingList.sass";

const BudgetingList = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [childData, setChildData] = useState<string>("");
  const [label, setLabel] = useState<string>("ADD MORE +");
  const [fields, setFields] = useState<Array<string>>([]);
  const [currField, setcurrField] = useState<string>("");
  const [isDuplicateField, setIsDuplicateField] = useState<boolean>(false);
  const [budgetingData, setBudgetingData] = useState<Array<any>>([
    { fieldName: "Student Loans", value: 0 },
    { fieldName: "Rent/Mortgage", value: 0 },
    { fieldName: "Internet", value: 0 },
    { fieldName: "Electricity", value: 0 },
    { fieldName: "Health Insurance", value: 0 },
    { fieldName: "Groceries", value: 0 },
  ]);

  /* Sets value for the Add MORE Button */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  // Adds data to the budgetingData array for further calculations.
  const addData = (fieldName: string, value: string, index: string): void => {
    value = value.replace(/\W|_/g, "");
    let fieldValue = parseInt(value);

    /* Translating InputField's IDs to the corresponding 
    index in the budgetingData array. */
    let idx = parseInt(index) - 100;
    /* For hard-coded InputFields */
    if (fieldName === "" && budgetingData[idx]) {
      budgetingData[idx].value = fieldValue;
      setBudgetingData(budgetingData);
    } else {
    /*For user-generated custom InputFields in the list */
      budgetingData.push({ fieldName: fieldName, value: fieldValue });
      setBudgetingData(budgetingData);
    }
  };

  /* Gets data and selected InputField's ID from the InputField element */
  /* ID argument is optional */
  const handleChildData = (data: string, id?: string): void => {
    setChildData(data);

    /* If ID is not null, set the current field's ID to 
    the selected element's ID */

    /* This is used to tell which InputField the input is coming from.
    The corresponding field in the budgetingData is then updated. */

    //This is ignored if ID is not provided.
    if (id !== undefined) {
      setcurrField(id);
    }
  };

  // For live recording of the user's input in the BudgetingList array.
  useEffect(() => {
    if (!!childData) {
      handleChildData(childData);

      addData("", childData, currField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childData]);

  const handleFocus = (): void => {
    setLabel("Enter a New Item:");
  };

  const handleBlur = (): void => {
    setLabel("ADD MORE +");
    setValue("");
    setIsDuplicateField(false);
  };

  const addField = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") {
      //check if budgetingData already contains the field
      if (budgetingData.some((item) => item.fieldName === value)) {
        setIsDuplicateField(true);
        return;
      }
      setFields([...fields, value]);
      e.preventDefault();
      addData(value, "0", currField);
      (e.target as HTMLElement).blur();
    }
  };

  const removeField = (index: number): void => {
    let data = [...fields];
    data.splice(index, 1);
    setFields(data);
    budgetingData.splice(index + 6, 1);
    setBudgetingData(budgetingData);
    setValue("");
  };

  return (
    <div className="budgeting-list-component">
      <ul className="budgeting-list">
        <li>
          <InputField
            id="100"
            label="Student Loans (%)"
            fieldType="PERCENTAGE"
            required={true}
            data={handleChildData}
          />
        </li>
        <li>
          <InputField
            id="101"
            label="Rent/Mortgage"
            fieldType="AMOUNT"
            required={true}
            data={handleChildData}
          />
        </li>
        <li>
          <InputField
            id="102"
            label="Internet"
            fieldType="AMOUNT"
            required={true}
            data={handleChildData}
          />
        </li>
        <li>
          <InputField
            id="103"
            label="Electricity"
            fieldType="AMOUNT"
            required={true}
            data={handleChildData}
          />
        </li>
        <li>
          <InputField
            id="104"
            label="Health Insurance"
            fieldType="AMOUNT"
            required={true}
            data={handleChildData}
          />
        </li>
        <li>
          <InputField
            id="105"
            label="Groceries"
            fieldType="AMOUNT"
            required={true}
            data={handleChildData}
          />
        </li>
        {fields.map((field, index) => (
          <li key={index} className="list-input-field">
            <InputField
              className="custom-field"
              id={`${index + 106}`}
              label={field}
              fieldType="AMOUNT"
              required={true}
              data={handleChildData}
            />
            <img
              className="remove-icon"
              src={svg}
              onClick={() => removeField(index)}
              alt="Remove a field."
            />
          </li>
        ))}
        <li>
          <div
            className={`input-field-component ${
              isDuplicateField ? "error" : ""
            }`}
          >
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyUp={addField}
              value={value}
            />
            <label className={value && "in-focus"}>{label}</label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BudgetingList;
