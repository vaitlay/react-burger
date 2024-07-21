import orderDetailsStyles from './order-details.module.css';
import doneImg from '../../images/done.png';
import { useSelector } from 'react-redux'


const OrderDetails = () => {

  const { orderId, isLoading, hasError, errorMessage } = useSelector(state => state.addOrderReducer);

  if (isLoading) return <p>Формирование заказа</p>
  else if (hasError) return <p>{`Ошибка - ${errorMessage}`}</p>
  else {
    return (
      <>
        <p className = {`text text_type_digits-large`}>{orderId}</p>
        <p className = {`text text_type_main-medium mt-8`}>идентификатор заказа</p>
        <img src={doneImg} className={`${orderDetailsStyles.imageSize} mt-15`} alt="картинка заказ принят" />
        <p className="text text_type_main-default text-center mt-15">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text-center text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
      </>
    )
  }
}



export default OrderDetails;