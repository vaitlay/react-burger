import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx'

const Modal = ({ header, children, onClose }) => {

  useEffect(() => {
    const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
    document.addEventListener('keydown', handleEscape);
    return (() => {
      document.removeEventListener('keydown', handleEscape)
    });
  },[]);



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
    children: PropTypes.element,
    //children: PropTypes.arrayOf(PropTypes.element),
    onClose: PropTypes.func.isRequired
}



export default Modal