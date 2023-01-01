import { useState } from "react";
import BudgetingList from "../../components/BudgetingList/BudgetingList";
import UserDetails from "../../components/UserDetails/UserDetails";
import { UserData } from "../../components/UserDetails/UserDetails.dto";
import { BudgetItem } from "../../components/BudgetingList/BudgetingList.dto";
import taxsim from "../../util/taxsim";
import "./Litmus.sass";

interface Results {
  Gross: number;
  Net: number;
  Taxes: number;
  MaxSavings: number;
  BreakevenAmount: number;
  MinimumExpenses: number;
}

const Litmus = (): JSX.Element => {
  const [userDetailsData, setUserDetailsData] = useState<UserData>({
    "Postal Code": "",
    "Annual Income": 0,
    Bonus: 0,
    "Relationship Status": undefined,
  });

  //Testing tax data (WIP)
  let input1 = ["taxsimid,mstat,year,pwages,state", "1,1,2023,138000,31"].join("\n")
  let input2 = {taxsimid: 1, mstat: 2, year: 1970, ltcg: 100000, idtl: 5}

  taxsim(input1).then(function(output) {
    console.log('taxsim output', output)
  }).catch(function(error) {
    console.log('taxsim failed', error)
  })

  const [BudgetingData, setBudgetingData] = useState<Array<BudgetItem>>([]);

  const [results, setResults] = useState<Results>({
    Gross: 0,
    Net: 0,
    Taxes: 0,
    MaxSavings: 0,
    BreakevenAmount: 0,
    MinimumExpenses: 0,
  });

  const handleUserData = (data: UserData): void => {
    setUserDetailsData(data);
  };

  const handleBudgetingData = (data: Array<BudgetItem>): void => {
    setBudgetingData(data);
  };

  const getTaxes = (): void => {
    //WIP

  };

  const calculateResults = (): void => {
    //WIP
  };

  return (
    <>
      <h1 className="hero-text spaced-text capitalized-text">
        Financial Calculator
      </h1>

      <div className="primary-details-container">
        <UserDetails exportData={handleUserData} />
      </div>

      <div className="secondary-details-container">
        <div id="descriptions">
          <p>
            Some weak ass quote intro to captivate the user. Only add the
            monthly charges of items you can't live without. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Aut exercitationem facere
            molestias delectus inventore provident qui consequuntur veniam,
            corporis architecto, fugit nesciunt odio error possimus eligendi
            tenetur velit? Asperiores, aliquid.
          </p>
          <div id="results" className="spaced-text capitalized-text">
            <div className="result-heading">
              <h2>Gross</h2>
              <h3>{`$${11966.11}`}</h3>
            </div>
            <div className="result-heading">
              <h2>Net</h2>
              <h3>{`$${9581.72}`}</h3>
            </div>
            <div className="result-heading">
              <h2>
                Taxes<span>(Gross - Net)</span>
              </h2>
              <h3>{`$${2891.56}`}</h3>
            </div>
          </div>
          <div className="synopsis">
            <h2 className="spaced-text capitalized-text">Synopsis</h2>
            <p>
              You can save at max <span>{`$${5681.11}`}/month</span> when you
              have a job and need atleast <span>{`$${3631.11}`}/month</span> to
              breakeven each month. <br />
              <br />
              If you lose your job, you will need atleast{" "}
              <span>{`$${1831.11}`}/month</span>. <br /> <br />
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
