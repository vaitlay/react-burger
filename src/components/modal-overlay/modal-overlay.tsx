import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlay = {
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: TModalOverlay): JSX.Element => {
    return (
        <div className={modalOverlayStyles.overlay}  onClick={onClose} data-test-id = 'modalOverlay'></div>
    );
}


export default ModalOverlay;