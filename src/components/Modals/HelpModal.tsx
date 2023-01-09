import "./ModalStyles.sass";
import svg from "../../assets/close-icon.svg";

type HelpModalProps = {
  setIsOpen: (state: boolean) => void;
};

const HelpModal = ({ setIsOpen }: HelpModalProps): JSX.Element => {
  return (
    <>
      <div className="modal-container" onClick={() => setIsOpen(false)} />
        <div className="centered">
          <div className="modal-content">
            <div className="modalHeader">
              <div className="heading">
                <p>Help</p>
                <ul>
                  <li> <strong>Current Tax Year:</strong> 2023.</li>
                  <li>Only enter expenses you can't live without.</li>
                  <li>Gross, Net and all other calculations are <strong>per month</strong>.</li>
                  <li>A base tax rate is applied if the Postal Code is not entered, or it is from a not-supported state.</li>
                  <li>Supported states are <strong>all 51 US states</strong>. US Army Postal Codes are not supported.</li>
                  <li>litmus.tools v1.0</li>
                </ul>
              </div>
              <div className="closeBtn">
                <img src={svg} alt="Close Button" onClick={() => setIsOpen(false)} />
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
