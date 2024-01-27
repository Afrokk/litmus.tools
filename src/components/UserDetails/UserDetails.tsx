import { useEffect, useState } from "react";
import { UserData } from "./UserDetails.dto";
import InputField from "Components/InputField/InputField";
import DropdownField from "Components/DropdownField/DropdownField";
import "./UserDetails.sass";

type UserDetailsProps = {
  exportData: (data: UserData) => void
};

const UserDetails = ({
  exportData,
}: UserDetailsProps) => {
  const [userDetailsData, setUserDetailsData] = useState<UserData>({
    "Postal Code": "",
    "Annual Income": 0,
    Bonus: 0,
    "Relationship Status": undefined,
  });

  const nonNumericFields = ["Postal Code", "Relationship Status"];

  useEffect(() => {
    if (exportData) {
      exportData(userDetailsData);
    }
  }, [userDetailsData, exportData]);

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
    if (exportData) {
      exportData(userDetailsData);
    }
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

UserDetails.defaultProps = {
  exportData: null
};

export default UserDetails;
