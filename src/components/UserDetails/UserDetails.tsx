import { useState } from "react";
import InputField from "../InputField/InputField";
import DropdownField from "../DropdownField/DropdownField";
import "./UserDetails.sass";

type UserData = {
  "Postal Code": string;
  "Annual Income": number;
  Bonus: number;
  "Relationship Status": "Single" | "Married" | undefined;
};

const UserDetails = () => {
  const [userDetailsData, setUserDetailsData] = useState<UserData>({
    "Postal Code": "",
    "Annual Income": 0,
    Bonus: 0,
    "Relationship Status": undefined,
  });
  const nonNumericFields = ["Postal Code", "Relationship Status"];

  const handleInputChildValue = (
    childValue: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e) {
      addDetailsData(e.target.name, e.target.value);
    }
  };

  const handleSelectChildValue = (
    childValue: string,
    e?: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e) {
      addDetailsData(e.target.name, e.target.value);
    }
  };

  const addDetailsData = (fieldName: string, value: string): void => {
    value = value.replace(/\W|_/g, "");
    let numericValue = parseInt(value);
    setUserDetailsData({
      ...userDetailsData,
      [fieldName]: nonNumericFields.includes(fieldName) ? value : numericValue,
    });
  };

  return (
    <div className="user-details-component">
      <InputField
        name="Postal Code"
        fieldType="POSTCODE"
        required={true}
        label="Postal Code"
        data={handleInputChildValue}
      />
      <InputField
        name="Annual Income"
        fieldType="AMOUNT"
        required={true}
        label="Annual Income"
        data={handleInputChildValue}
      />
      <InputField
        name="Bonus"
        fieldType="AMOUNT"
        required={true}
        label="Bonus"
        data={handleInputChildValue}
      />
      <DropdownField
        name="Relationship Status"
        label="Single/Married"
        options={["Single", "Married"]}
        required={true}
        data={handleSelectChildValue}
      />
    </div>
  );
};

export default UserDetails;
