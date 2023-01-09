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
                <p>About</p>
                <ul>
                  <li> <strong>Developed with &#128153; by</strong></li>
                  <li>Afrasiyab (Afrokk) Khan - <a href="https://github.com/Afrokk">GitHub</a> | <a href="https://www.linkedin.com/in/afrasiyab-k/">LinkedIn</a> | <a href="http://afrokk.dev/"> Website</a></li>
                  <li>Usman Abdul Jabbar - <a href="https://github.com/UsmanAJabbar">GitHub</a> | <a href="https://www.linkedin.com/in/usman-abdul-jabbar/">LinkedIn</a></li>
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
