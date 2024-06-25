import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
    return (
        <div className={modalOverlayStyles.overlay}  onClick={onClose}></div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;