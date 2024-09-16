import styles from './pages.module.css';
import OrderInfo from '../components/orders/order-info/order-info'

import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router'

import { TOrder } from '../types'
import { useDispatch } from '../hooks/useDispatch'
import { useSelector } from '../hooks/useSelector'
import { getCurrentOrder } from '../services/actions/order-data'
import { USER_ORDERS_WS_CONNECTION_START } from '../services/actions/user-orders' 
import { API_GET_ORDER } from '../utils/api'

const OrderInfoPage = ({ isUserProfile }: {isUserProfile: boolean}): JSX.Element => {  

  const orderNumber = Number(useParams().number); 
  const dispatch = useDispatch();

  const feedAllData = useSelector((state) => state.wsAllOrdersReducer);
  const feedUserData = useSelector((state) => state.wsUserOrdersReducer);
  
  const feedData = isUserProfile ? feedUserData : feedAllData;

  const orderFromFeed = useMemo(() => {
    return feedData.messages.orders.find((order: TOrder) => order.number === orderNumber);
  },[feedData]);

  const loadedOrder = useSelector(state => state.orderReducer.loadedOrder);
  const order = orderFromFeed ? orderFromFeed : loadedOrder;  

  useEffect(() => {
    if (!order && !isUserProfile) dispatch(getCurrentOrder(orderNumber));
    if (!order && isUserProfile) dispatch({type: USER_ORDERS_WS_CONNECTION_START, payload: {url: API_GET_ORDER, sendToken: true}});   
  },[]);

  if (!order && !feedData.wsConnected) return <p>Загрузка данных о заказе</p>
  if (!order) return <p>Указанный заказ не найден</p>
  return (
    <OrderInfo showStatus = {isUserProfile? true : false} order = {order} /> 
  )
}

export default OrderInfoPage