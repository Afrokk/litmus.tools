import "./ModalStyles.sass";
import svg from "../../assets/close-icon.svg";

type AboutModalProps = {
  setIsOpen: (state: boolean) => void;
};

const AboutModal = ({ setIsOpen }: AboutModalProps): JSX.Element => {
  return (
    <>
      <div className="modal-container" onClick={() => setIsOpen(false)} />
      <div className="content">
        <p>OOOGA OOGA</p>
        <div className="closeBtn">
          <img src={svg} alt="" onClick={() => setIsOpen(false)}/>
        </div>
      </div>
    </>
  );
};

AboutModal.defaultProps = {
  setIsOpen: null,
};

export default AboutModal;
