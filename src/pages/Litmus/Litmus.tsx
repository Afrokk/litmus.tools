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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
            sint fugit facilis repellat, mollitia cum modi, unde quas ullam quos
            cumque, nulla illum accusamus minus rerum minima saepe fuga tempora.
            Sequi, delectus porro odit deserunt tempore expedita tempora.
            Explicabo obcaecati optio minus. Cupiditate odio illum facilis, enim
            voluptate saepe modi itaque pariatur possimus, ut mollitia iure
            dolore tenetur libero qui? Laudantium minus quae cum, dolorem,
            repudiandae esse quibusdam, ab maxime explicabo temporibus ad sequi
            ipsam magni alias provident aliquid! Rerum blanditiis, similique
            nihil possimus error at illo sapiente harum iste. Quidem quam
            voluptate aliquam maiores minus, nobis eos aperiam illum optio
            quisquam amet, modi dolor nulla labore autem cum omnis, ut quae
            voluptates quis sunt! Possimus repudiandae obcaecati cupiditate
            minima? Perspiciatis, sed quas. Culpa incidunt nobis quidem
            inventore possimus perferendis ex hic corrupti labore facere alias
            dolor eligendi vel illum ab maiores nostrum assumenda sequi error,
            facilis nisi? Quaerat, aspernatur!
          </p>
        </div>
        <div id="budgeting-list">
          <BudgetingList exportData={handleBudgetingData} />
        </div>
      </div>
    </>
  );
};

export default Litmus;
