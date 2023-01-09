import "./ModalStyles.sass";

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
              <p>OOOGA OOGA</p>
            </div>
            <div className="closeBtn">
              <button onClick={() => setIsOpen(false)}>X</button>
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
