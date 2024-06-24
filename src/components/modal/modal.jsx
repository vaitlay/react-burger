import ReactDOM from 'react-dom';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx'

const Modal = ({ header, children, onClose }) => {
  const EscapeKeyPress = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    console.log(e);
  },[onClose]);

  useEffect(() => {
    document.addEventListener('keydown', EscapeKeyPress);
    return (() => {
      document.removeEventListener('keydown', EscapeKeyPress)
    });
  },[EscapeKeyPress]);



  return ReactDOM.createPortal(
    (
    <>
    <ModalOverlay onClose={onClose} />
    <div className={`${modalStyles.container} p-10`}>
      <div className={`${modalStyles.header}`}>
        <p className = 'text text_type_main-large'>{header}</p>
        <CloseIcon type="primary" onClick={onClose}/>
      </div>  
      <div className ={`${modalStyles.body} mt-5`}>  
        {children}
      </div>
    </div>  
    </>
    ), document.getElementById('modals'));

}

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    onClose: PropTypes.func.isRequired
}



export default Modal