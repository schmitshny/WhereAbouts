import "./Modal.scss";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  if (!open) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modalContainer"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
