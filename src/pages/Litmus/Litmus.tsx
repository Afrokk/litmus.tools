import BudgetingList from "../../components/BudgetingList/BudgetingList";
import DropdownField from "../../components/DropdownField/DropdownField";
import InputField from "../../components/InputField/InputField";
import "./Litmus.sass";

const Litmus = (): JSX.Element => {
  return (
    <>
      <h1 className="spaced-text capitalized-text">
        Financial Calculator
      </h1>

      <div className="primary-details-container">
        <InputField fieldType="POSTCODE" required={true} label="Postal Code"/>
        <InputField fieldType="AMOUNT" required={true} label="Yearly Income"/>
        <InputField fieldType="AMOUNT" required={true} label="Bonus"/>
        <DropdownField
          label="Single/Married"
          options={["Single", "Married"]}
          required={true}
        />
      </div>

      <div className="secondary-details-container">
        <div id="results">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere sint fugit facilis repellat, mollitia cum modi, unde quas ullam quos cumque, nulla illum accusamus minus rerum minima saepe fuga tempora.
          Sequi, delectus porro odit deserunt tempore expedita tempora. Explicabo obcaecati optio minus. Cupiditate odio illum facilis, enim voluptate saepe modi itaque pariatur possimus, ut mollitia iure dolore tenetur libero qui?
          Laudantium minus quae cum, dolorem, repudiandae esse quibusdam, ab maxime explicabo temporibus ad sequi ipsam magni alias provident aliquid! Rerum blanditiis, similique nihil possimus error at illo sapiente harum iste.
          Quidem quam voluptate aliquam maiores minus, nobis eos aperiam illum optio quisquam amet, modi dolor nulla labore autem cum omnis, ut quae voluptates quis sunt! Possimus repudiandae obcaecati cupiditate minima?
          Perspiciatis, sed quas. Culpa incidunt nobis quidem inventore possimus perferendis ex hic corrupti labore facere alias dolor eligendi vel illum ab maiores nostrum assumenda sequi error, facilis nisi? Quaerat, aspernatur!</p>
        </div>
        <div id="list">
          <BudgetingList />
        </div>
      </div>
    </>
  );
};

export default Litmus;