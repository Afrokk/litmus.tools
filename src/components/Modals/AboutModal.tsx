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
                <li>
                  {" "}
                  <strong>Developed with &#128153; by</strong>
                </li>
                <li>
                  Afrasiyab (Afrokk) Khan -{" "}
                  <a
                    href="https://github.com/Afrokk"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://www.linkedin.com/in/afrasiyab-k/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>{" "}
                  |{" "}
                  <a href="http://afrokk.dev/" target="_blank" rel="noreferrer">
                    {" "}
                    Website
                  </a>
                </li>
                <li>
                  Usman Abdul Jabbar -{" "}
                  <a
                    href="https://github.com/UsmanAJabbar"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://www.linkedin.com/in/usman-abdul-jabbar/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Afrokk/litmus.tools"
                    target="_blank"
                    rel="noreferrer"
                  >
                    litmus.tools GitHub Page
                  </a>
                </li>
                <li id="version-tag">
                  Taxation Data by{" "}
                  <a
                    href="https://www.nber.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    US NBER
                  </a>
                  <br /><br /> <span> litmus.tools v1.0</span>
                </li>
              </ul>
            </div>
            <div className="closeBtn">
              <img
                src={svg}
                alt="Close Button"
                onClick={() => setIsOpen(false)}
              />
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
