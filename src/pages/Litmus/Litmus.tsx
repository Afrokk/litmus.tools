import { useState, useMemo } from "react";
import BudgetingList from "../../components/BudgetingList/BudgetingList";
import UserDetails from "../../components/UserDetails/UserDetails";
import { UserData } from "../../components/UserDetails/UserDetails.dto";
import { BudgetItem } from "../../components/BudgetingList/BudgetingList.dto";
import taxsim from "../../util/taxsim";
import getStateFromPostalCode from "../../util/PostalCodeToState.mjs";
import "./Litmus.sass";
import HelpModal from "../../components/Modals/HelpModal";
import AboutModal from "../../components/Modals/AboutModal";

interface Results {
  gross: string;
  net: string;
  taxes: string;
  maxSavings: string;
  breakevenAmount: string;
  minimumExpenses: string;
}

const Litmus = (): JSX.Element => {
  const [userDetailsData, setUserDetailsData] = useState<UserData>({
    "Postal Code": "",
    "Annual Income": 0,
    Bonus: 0,
    "Relationship Status": undefined,
  });

  const [BudgetingData, setBudgetingData] = useState<Array<BudgetItem>>([]);

  const [results, setResults] = useState<Results>({
    gross: "0.00",
    net: "0.00",
    taxes: "0.00",
    maxSavings: "0.00",
    breakevenAmount: "0.00",
    minimumExpenses: "0.00",
  });

  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [toggleError, setToggleError] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  const handleUserData = (data: UserData): void => {
    setUserDetailsData(data);
  };

  const handleBudgetingData = (data: Array<BudgetItem>): void => {
    setBudgetingData(data);
  };

  const getTaxes = async (): Promise<void> => {
    let marriageStatus = 0;

    if (userDetailsData["Relationship Status"] === "Married") {
      marriageStatus = 2;
      setIsDataValid(true);
    } else if (userDetailsData["Relationship Status"] === "Single") {
      marriageStatus = 1;
      setIsDataValid(true);
    } else if (userDetailsData["Relationship Status"] === undefined) {
      setIsDataValid(true);
    } else {
      setIsDataValid(false);
    }

    if (userDetailsData["Annual Income"]) {
      let taxInput = {
        taxsimid: 1,
        mstat: marriageStatus,
        year: 2023,
        pwages: `${
          userDetailsData["Annual Income"] + userDetailsData["Bonus"]
        }`,
        state: await getStateFromPostalCode(userDetailsData["Postal Code"]),
      };

      if (taxInput.state >= 0 && taxInput.state < 50) {
        setToggleError(false);
      } else {
        setToggleError(true);
        return;
      }

      if (
        isDataValid &&
        !toggleError &&
        userDetailsData["Bonus"] >= 0 &&
        userDetailsData["Annual Income"]
      ) {
        try {
          let taxOutput = await taxsim(taxInput);
          setResults(calculateResults(taxOutput));
          setToggleError(false);
        } catch (error) {
          setToggleError(true);
        }
      }
    }
  };

  useMemo(() => {
    getTaxes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetailsData, BudgetingData]);

  const calculateResults = (taxData: string): Results => {
    let taxResults: { [key: string]: number } = {
      taxismid: 0,
      year: 0,
      state: 0,
      fiitax: 0,
      siitax: 0,
      fica: 0,
      frate: 0,
      srate: 0,
      ficar: 0,
      tfica: 0,
    };

    let calculations: Results = {
      gross: "0",
      net: "0",
      taxes: "0",
      maxSavings: "0",
      breakevenAmount: "0",
      minimumExpenses: "0",
    };

    let parseTaxData = taxData.split(/\r?\n/);
    parseTaxData[1].split(",").forEach((value, index) => {
      let key = Object.keys(taxResults)[index];
      taxResults[key] = parseInt(value);
    });

    let taxFromBonus = userDetailsData.Bonus * (36.5 / 100);
    let yearlyGrossIncome =
      userDetailsData["Annual Income"] + (userDetailsData.Bonus - taxFromBonus);

    calculations.gross = (yearlyGrossIncome / 12).toFixed(2);

    calculations.net = (
      parseFloat(calculations.gross) -
      (taxResults.fiitax + taxResults.siitax) / 12
    ).toFixed(2);

    if (calculations.gross === calculations.net || yearlyGrossIncome < 10000) {
      calculations.taxes = "0.00";
    } else {
      calculations.taxes = (
        parseFloat(calculations.gross) -
        parseFloat(calculations.net) +
        taxFromBonus / 12
      ).toFixed(2);
    }

    let totalExpenses = 0;

    BudgetingData.forEach((entry) => {
      if (entry.value === "") {
        totalExpenses += 0;
      } else if (entry.fieldType === "AMOUNT") {
        let numericValue = parseInt(entry.value.replace(/\W|_/g, ""));
        if (Number.isNaN(numericValue)) {
          numericValue = 0;
        } else if (numericValue > 0) {
          totalExpenses += numericValue;
        }
      } else if (entry.fieldType === "AMOUNTorPERCENTAGE") {
        if (entry.value.includes("%")) {
          let numericValue = parseInt(entry.value.replace(/\W|_/g, ""));
          numericValue =
            (userDetailsData["Annual Income"] / 12) *
            (parseFloat(entry.value) / 100);

          if (Number.isNaN(numericValue)) {
            numericValue = 0;
          } else if (numericValue > 0) {
            totalExpenses += numericValue;
          }
        } else if (entry.value.includes("$")) {
          let numericValue = parseInt(entry.value.replace(/\W|_/g, ""));
          if (Number.isNaN(numericValue)) {
            numericValue = 0;
          } else if (numericValue > 0) {
            totalExpenses += numericValue;
          }
        }
      } else if (entry.fieldType === "PERCENTAGE") {
        let numericValue = parseInt(entry.value.replace(/\W|_/g, ""));
        numericValue =
          parseFloat(calculations.gross) * (parseFloat(entry.value) / 100);
        if (Number.isNaN(numericValue)) {
          numericValue = 0;
        } else if (numericValue > 0) {
          totalExpenses += numericValue;
        }
      }
    });
    calculations.breakevenAmount = totalExpenses.toFixed(2);
    calculations.maxSavings = (
      yearlyGrossIncome / 12 -
      parseFloat(calculations.breakevenAmount)
    ).toFixed(2);

    if (parseFloat(calculations.maxSavings) < 0) {
      calculations.maxSavings = "0.00";
    }

    let minimumExpenses = 0;

    BudgetingData.forEach((entry) => {
      if (
        entry.value.includes("%") &&
        entry.fieldName.startsWith("Student Loans")
      ) {
        minimumExpenses += 0;
      } else {
        let numericValue = parseFloat(entry.value.replace(/\W|_/g, ""));
        if (Number.isNaN(numericValue)) {
          numericValue = 0;
        } else if (numericValue > 0) {
          minimumExpenses += numericValue;
        }
      }
    });

    calculations.minimumExpenses = minimumExpenses.toFixed(2);
    return calculations;
  };
  return (
    <>
      <h1 className="hero-text spaced-text capitalized-text">
        Financial Calculator
      </h1>

      <div
        className={`primary-details-container ${
          toggleError ? "post-code-error" : ""
        }`}
      >
        <UserDetails exportData={handleUserData} />
      </div>

      <div className="secondary-details-container">
        <div id="descriptions">
          <p>
            Welcome! <br /><br /> Litmus.tools' Financial Calculator makes it extremely easy and straight forward to calculate your income & taxes, get insights, and plan out your budget - all in one place. Simply enter your details and non-discretionary expenses, and it'll do the rest.
          </p>

          <div id="results" className="spaced-text capitalized-text">
            <div className="result-heading">
              <h2>Gross</h2>
              <h3>{`$${results.gross}`}</h3>
            </div>
            <div className="result-heading">
              <h2>Net</h2>
              <h3>{`$${results.net}`}</h3>
            </div>
            <div className="result-heading">
              <h2>
                Taxes<span>(Gross - Net)</span>
              </h2>
              <h3>{`$${results.taxes}`}</h3>
            </div>
          </div>
          <div className="synopsis">
            <h2 className="spaced-text capitalized-text">Synopsis</h2>
            <p>
              You can save at max <span>{`$${results.maxSavings}`}/month</span>{" "}
              when you have a job and need atleast{" "}
              <span>{`$${results.breakevenAmount}`}/month</span> to breakeven
              each month. <br />
              <br />
              If you lose your job, you will need atleast
              <span> {`$${results.minimumExpenses}`}/month</span>. <br /> <br />
              <span>Note:</span> This tool may not be super accurate.
            </p>
          </div>
        </div>
        <div id="budgeting-list">
          <BudgetingList exportData={handleBudgetingData} />
        </div>
      </div>
      <div className="footer">
        <ul>
          <li><button onClick={() => setIsHelpModalOpen(true)}>Help</button></li>
          {isHelpModalOpen && <HelpModal setIsOpen={setIsHelpModalOpen} />}
          <li><button onClick={() => setIsAboutModalOpen(true)}>About</button></li>
          {isAboutModalOpen && <AboutModal setIsOpen={setIsAboutModalOpen} />}
        </ul>
        <p>
          &copy; Copyright 2023 litmus.tools
        </p>
      </div>
    </>
  );
};

export default Litmus;
