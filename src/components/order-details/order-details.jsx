import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import doneImg from '../../images/done.png';
import Modal from '../modal/modal.jsx';

const OrderDetails = ({ orderId, onClose }) => {
  return (
    <Modal header = '' onClose = {onClose}>
      <p className = {`text text_type_digits-large`}>{orderId}</p>
      <p className = {`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img src={doneImg} className={`${orderDetailsStyles.imageSize} mt-15`} alt="картинка заказ принят" />
      <p className="text text_type_main-default text-center mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text-center text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
    </Modal>
  )
}

OrderDetails.propTypes = {
    orderId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default OrderDetails;