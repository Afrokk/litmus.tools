import { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import svg from "../../assets/x-lg.svg";
import "./BudgetingList.sass";

type BudgetItem = {
  fieldName: string;
  fieldType?: string;
};

interface UserBudgetItems extends BudgetItem {
  value: string; 
}

interface PresetBudgetItems extends BudgetItem {
  value: number;
}

const BudgetingList = (): JSX.Element => {
  const [newFieldValue, setNewFieldValue] = useState<string>("");
  const [childValue, setChildValue] = useState<string>("");
  const [newFieldLabel, setNewFieldLabel] = useState<string>("ADD MORE +");
  const [focusField, setFocusField] = useState<string>("");
  const [isDuplicateField, setIsDuplicateField] = useState<boolean>(false);
  const [userBudgetFields, setUserBudgetFields] = useState<Array<UserBudgetItems>>([]);
  const [budgetingData, setBudgetingData] = useState<Array<PresetBudgetItems>>([
    { fieldName: "Student Loans (%)", fieldType: "PERCENTAGE", value: 0 },
    { fieldName: "Rent/Mortgage", fieldType: "AMOUNT", value: 0 },
    { fieldName: "Internet", fieldType: "AMOUNT", value: 0 },
    { fieldName: "Electricity", fieldType: "AMOUNT", value: 0 },
    { fieldName: "Health Insurance", fieldType: "AMOUNT", value: 0 },
    { fieldName: "Groceries", fieldType: "AMOUNT", value: 0 },
  ]);

  const indexIDOffset = 100;
  const numPresetFields = budgetingData.length - userBudgetFields.length;
  const IDIndexOffset = numPresetFields + indexIDOffset;

  /* Sets value for the Add MORE Button */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewFieldValue(e.target.value);
  };

  // Adds data to the budgetingData array for further calculations.
  const addBudgetingData = (
    fieldName: string,
    value: string,
    index: string
  ): void => {
    value = value.replace(/\W|_/g, "");
    let fieldValue = parseInt(value);
    fieldName === "" && budgetingData[parseInt(index) - indexIDOffset]
      ? (budgetingData[parseInt(index) - indexIDOffset].value = fieldValue) &&
        setBudgetingData([...budgetingData])
      : budgetingData.push({
          fieldName: fieldName,
          fieldType: "AMOUNT",
          value: fieldValue,
        }) && setBudgetingData([...budgetingData]);
  };

  const handleChildValue = (
    childValue: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setChildValue(childValue);

    if (!e) return;
    let id = e.target.id;
    setFocusField(id);
    if (parseInt(id) >= IDIndexOffset) {
      userBudgetFields[parseInt(id) - IDIndexOffset].value = e.target.value;
      setUserBudgetFields([...userBudgetFields]);
      setChildValue(userBudgetFields[parseInt(id) - IDIndexOffset].value);
    }
  };

  useEffect(() => {
    if (childValue) {
      handleChildValue(childValue);
      addBudgetingData("", childValue, focusField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childValue]);

  const handleFocus = (): void => {
    setNewFieldLabel("Type New Field and Press Enter:");
  };

  const handleBlur = (): void => {
    setNewFieldLabel("ADD MORE +");
    setNewFieldValue("");
    setIsDuplicateField(false);
  };

  const addField = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code !== "Enter") {return;}
    if (budgetingData.some((item) => item.fieldName === newFieldValue) || newFieldValue === "") {
      setIsDuplicateField(true);
      return;
    }
    setUserBudgetFields([
      ...userBudgetFields,
      {
        fieldName: `${newFieldValue}`,
        value: "",
      },
    ]);
    e.preventDefault();
    addBudgetingData(newFieldValue, "0", focusField);
    (e.target as HTMLElement).blur();
  };

  const removeField = (index: number): void => {
    userBudgetFields.splice(index, 1);
    setUserBudgetFields([...userBudgetFields]);
    budgetingData.splice(index + numPresetFields, 1);
    setBudgetingData([...budgetingData]);
  };

  const formatPassValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (parseInt(e.target.id) < IDIndexOffset) {return;}
    const focusFieldIdx = parseInt(e.target.id) - IDIndexOffset;
    if (
      !userBudgetFields[focusFieldIdx].value.includes("$") &&
      userBudgetFields[focusFieldIdx].value !== ""
    ) {
      userBudgetFields[focusFieldIdx].value = `$${
        userBudgetFields[focusFieldIdx].value
      }`;
      setUserBudgetFields([...userBudgetFields]);
      setChildValue(userBudgetFields[focusFieldIdx].value);
    }
  };
  
  return (
    <div className="budgeting-list-component">
      <ul className="budgeting-list">
        {budgetingData.map((item, index) => {
          if (index < numPresetFields) {
            return (
              <li key={index}>
                <InputField
                  id={(index + indexIDOffset).toString()}
                  label={item.fieldName}
                  fieldType={item.fieldType}
                  required={true}
                  data={handleChildValue}
                />
              </li>
            );
          } else {
            return null;
          }
        })}
        {userBudgetFields.map((field, index) => (
          <li key={index} className="list-input-field">
            <InputField
              className="custom-field"
              id={`${index + (numPresetFields + indexIDOffset)}`}
              label={field.fieldName}
              name={field.fieldName}
              passValue={field.value}
              fieldType="AMOUNT"
              required={true}
              data={handleChildValue}
              onBlur={formatPassValue}
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
              value={newFieldValue}
            />
            <label className={newFieldValue && "in-focus"}>
              {newFieldLabel}
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BudgetingList;
