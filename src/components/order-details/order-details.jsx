import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import doneImg from '../../images/done.png';
import { useSelector, useDispatch } from 'react-redux'
import { addCurrentOrder } from '../../services/actions/add-order-data.js'
import { CLEAR_INGREDIENTS } from '../../services/actions/constructor-list.js';

const OrderDetails = () => {

  const dispatch = useDispatch();  

  const orderEndPoint = 'orders';
  const { orderId, isLoading, hasError, errorMessage } = useSelector(state => state.addOrderReducer);
  const { buns, ingredients } = useSelector(state => state.constructorListReducer);

  React.useEffect(() => {
    console.log("Order sending...")
    const orderData = [];
    for (let bun of buns) orderData.push(bun._id);
    for (let ingr of ingredients) orderData.push(ingr._id);
    dispatch(addCurrentOrder(orderEndPoint, orderData));
  },[dispatch, buns, ingredients]);
  

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