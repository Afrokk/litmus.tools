import BudgetingList from "../../components/BudgetingList/BudgetingList";
import DropdownField from "../../components/DropdownField/DropdownField";
import InputField from "../../components/InputField/InputField";
import "./Litmus.sass";

const Litmus = (): JSX.Element => {
  return (
    <>
      <h1
        style={{ padding: "1.5rem 0" }}
        className="spaced-text capitalized-text"
      >
        Financial Calculator
      </h1>

      <div className="primary-details-container">
        <InputField fieldType="POSTCODE" required={true} label="Post Code" />
        <InputField fieldType="AMOUNT" required={true} label="Yearly Income" />
        <InputField fieldType="AMOUNT" required={true} label="Bonus" />
        <DropdownField
          label="Single/Married?"
          options={["Single", "Married"]}
          required={true}
        />
      </div>

      <div className="secondary-details-container">
        <div className="half-width"></div>
        <div className="half-width">
          <BudgetingList />
        </div>
      </div>
    </>
  );
};

export default Litmus;
