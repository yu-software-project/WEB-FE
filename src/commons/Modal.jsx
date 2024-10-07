import ReactDOM from "react-dom";
import "styles/commons/Modal.scss";

const Backdrop = ({ onClose }) => (
  <div className="modal-overlay" onClick={onClose} />
);

const ModalOverlay = ({ className, children }) => (
  <div className={`modal ${className}`}>{children}</div>
);

const portalElement = document.getElementById("overlays");

const Modal = ({ className, children, onClose }) => (
  <>
    {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
    {ReactDOM.createPortal(
      <ModalOverlay className={className}>{children}</ModalOverlay>,
      portalElement
    )}
  </>
);

export default Modal;
