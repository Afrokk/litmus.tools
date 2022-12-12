import { useState } from "react";
import BudgetingList from "../../components/BudgetingList/BudgetingList";
import UserDetails from "../../components/UserDetails/UserDetails";
import { UserData } from "../../components/UserDetails/UserDetails.dto";
import { PresetBudgetItems } from "../../components/BudgetingList/BudgetingList.dto";
import "./Litmus.sass";

type BudgetingData = Array<PresetBudgetItems>;

//WIP
const Litmus = (): JSX.Element => {
  const [userDetailsData, setUserDetailsData] = useState<UserData>({
    "Postal Code": "",
    "Annual Income": 0,
    Bonus: 0,
    "Relationship Status": undefined,
  });
  const [budgetingData, setBudgetingData] = useState<BudgetingData>();

  const handleUserData = (data: UserData): void => {
    setUserDetailsData(data);
  };

  const handleBudgetingData = (data: BudgetingData): void => {
    setBudgetingData([...data]);
  };

  return (
    <>
      <h1 className="spaced-text capitalized-text">Financial Calculator</h1>

      <div className="primary-details-container">
        <UserDetails exportData={handleUserData} />
      </div>

      <div className="secondary-details-container">
        <div id="results">
          <p>
            Some weak ass quote into to captivate the user. Only add the monthly charges of items you can't live without. <br /><br /> <br />
            <strong>Note:</strong> This tool may not be super accurate.
          </p>
          <div className="spaced-text result-headings">
            <h2>Gross</h2>
            <h2>Net</h2>
            <h2>Taxes</h2>
            <h3>(Gross - Net)</h3>
          </div>
        </div>
        <div id="budgeting-list">
          <BudgetingList exportData={handleBudgetingData} />
        </div>
      </div>
    </>
  );
};

export default Litmus;
