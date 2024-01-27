import "./ModalStyles.sass";
import svg from "Assets/close-icon.svg";

type HelpModalProps = {
  setIsOpen: (state: boolean) => void;
};

const HelpModal = ({ setIsOpen }: HelpModalProps): JSX.Element => {
  const closeModal = () => setIsOpen(false);
  const stopPropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <>
      <div className="modal-container" onClick={closeModal}>
        <div className="centered">
          <div className="modal-content" onClick={stopPropagation}>
            <div className="modalHeader">
              <div className="heading">
                <p>Help</p>
                <div className="help-points">
                  <ul>
                    <li>
                      {" "}
                      <strong>Last Tax Data Update:</strong> Dec 2023.
                    </li>
                    <li>Only enter expenses you can't live without.</li>
                    <li>
                      Gross, Net and all other calculations are{" "}
                      <strong>per month</strong>.
                    </li>
                    <li>
                      A base tax rate is applied if the Postal Code is not
                      entered, or if it is from an unsupported state.
                    </li>
                    <li>
                      Supported states are <strong>all 51 US states</strong>. US
                      Army Postal Codes are not supported.
                    </li>
                    <li>
                      {" "}
                      The Student Loans field accepts both dollar ($) and
                      percentage(%) amounts. If your student loans are a
                      percentage (%), you can enter it like "x%". By default,
                      Student Loans are treated as a $ amount.
                    </li>
                    <li>litmus.tools v1.0</li>
                  </ul>
                </div>
              </div>
              <div className="closeBtn">
                <img src={svg} alt="Close Button" onClick={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HelpModal.defaultProps = {
  setIsOpen: null,
};

export default HelpModal;
