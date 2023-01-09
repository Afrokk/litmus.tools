import "./ModalStyles.sass";

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
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
      </div>
    </>
  );
};

AboutModal.defaultProps = {
  setIsOpen: null,
};

export default AboutModal;
