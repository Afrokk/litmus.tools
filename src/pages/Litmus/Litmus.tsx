import { useState } from "react";
import BudgetingList from "../../components/BudgetingList/BudgetingList";
import UserDetails from "../../components/UserDetails/UserDetails";
import { UserData } from "../../components/UserDetails/UserDetails.dto";
import { BudgetItem } from "../../components/BudgetingList/BudgetingList.dto";
import "./Litmus.sass";

type BudgetingData = Array<BudgetItem>;

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
      <h1 className="hero-text spaced-text capitalized-text">Financial Calculator</h1>

      <div className="primary-details-container">
        <UserDetails exportData={handleUserData} />
      </div>

      <div className="secondary-details-container">
        <div id="descriptions">
          <p>
            Some weak ass quote into to captivate the user. Only add the monthly
            charges of items you can't live without. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aut exercitationem facere molestias
            delectus inventore provident qui consequuntur veniam, corporis
            architecto, fugit nesciunt odio error possimus eligendi tenetur
            velit? Asperiores, aliquid.
          </p>
          <div id="results" className="spaced-text capitalized-text">
            <div className="result-heading">
              <h2>Gross</h2>
              <h3>$11966.11</h3>
            </div>
            <div className="result-heading">
              <h2>Net</h2>
              <h3>$9581.72</h3>
            </div>
            <div className="result-heading">
              <h2>
                Taxes<span>(Gross - Net)</span>
              </h2>
              <h3>$2891.56</h3>
            </div>
          </div>
          <div className="synopsis">
            <h2 className="spaced-text capitalized-text">Synopsis</h2>
            <p>
              You can save at max <span>$5681.11/month</span> when you have a
              job and need atleast <span>$3631.11/month</span> to breakeven each
              month. <br />
              <br />
              If you lose your job, you will need atleast{" "}
              <span>$1831.11/month</span>. <br /> <br />
              <span>Note:</span> This tool may not be super accurate.
            </p>
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
