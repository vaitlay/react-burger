import styles from './page.module.css';
import React from 'react'

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../hooks/useSelector';
import { useDispatch } from '../hooks/useDispatch';
import { ROUTE_FEED } from '../utils/route-endpoints';
import { ALL_ORDERS_WS_CONNECTION_START, ALL_ORDERS_WS_CONNECTION_CLOSED } from '../services/actions/all-orders';
import { API_GET_ALL_ORDERS } from '../utils/api';

import OrderFeedList from '../components/orders/order-feed-list/order-feed-list'

const FeedPage = (): JSX.Element => {

  const dispatch = useDispatch();
  const location = useLocation();

  const feedData = useSelector((state) => state.wsAllOrdersReducer); 

  const orders = feedData.messages.orders;
  const readyOrders = orders
    .filter(order => order.status === 'done')
    .map(order => {return order.number});
  const inWorkOrders = orders
    .filter(order => order.status === 'pending')
    .map(order => {return order.number});  

  React.useEffect(() => {
    console.log("Loading all order data from server")
    dispatch({type: ALL_ORDERS_WS_CONNECTION_START, payload: {url: API_GET_ALL_ORDERS, sendToken: false}});     
    return () => {
        dispatch({ type: ALL_ORDERS_WS_CONNECTION_CLOSED });
    }
  },[]);


  if (!feedData.wsConnected) return <p>Создание WebSocket соединения с сервером</p>
  else if (feedData.error) return <p>{`Ошибка установления WebSocket соединения ${feedData.error}`}</p>
  else {
    return (
      <div>
        <p className = 'text_type_main-large'>Лента заказов</p>
        <div className = {styles.feedContainer}>
          <OrderFeedList orderList = {orders} showStatus = {false} isUserProfile = {false}/>
          <section className={`ml-15 ${styles.feedSection}`}>
            <div className = {`mb-15 ${styles.feedStatus}`}>
              <div className = {`${styles.feedOrders}`}>
                <p className = 'mb-6 text_type_main-medium' >Готовы:</p>
                <div className = {`text_type_digits-default ${styles.feedOrderContainer}`}>
                  {readyOrders.slice(0,20).map(order => {
                    return (
                      <Link to = {`${ROUTE_FEED}/${order}`} 
                        key = {order} 
                        className = {styles.feedReadyOrders}
                        state ={{backgroundLocation : location}}
                        >
                        
                        {order}
                      </Link>
                    )
                  })
                  }
                </div>
              </div>
              <div className = {`${styles.feedOrders}`}>
                <p className = 'mb-6 text_type_main-medium' >В работе:</p>
                <div className = {`text_type_digits-default ${styles.feedOrderContainer}`}>
                  {inWorkOrders.slice(0,20).map(order => {
                    return (
                      <Link to = {`${ROUTE_FEED}/${order}`} 
                        key = {order} 
                        style={{ textDecoration: 'inherit', color: "white" }}
                        state ={{backgroundLocation : location}}>
                        {order}
                      </Link>
                    )
                  })
                  }
                </div>
              </div>
            </div>
            <div className = {`text_type_main-medium`} >Выполнено за всё время:</div>
            <div className = {`text_type_digits-large ${styles.feedTextShadow} mb-15`} >{feedData.messages.total}</div>
            <div className = {`text_type_main-medium`} >Выполнено за сегодня:</div>
            <div className = {`text_type_digits-large ${styles.feedTextShadow}`} >{feedData.messages.totalToday}</div>
          </section>
        </div>
      </div>
    )
  }
  
}

export default FeedPage;
