import React from 'react'

import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { API_GET_ORDER } from '../../utils/api';
import { USER_ORDERS_WS_CONNECTION_START, USER_ORDERS_WS_CONNECTION_CLOSED } from '../../services/actions/user-orders';
import { ALL_ORDERS_WS_CONNECTION_START, ALL_ORDERS_WS_CONNECTION_CLOSED } from '../../services/actions/all-orders';

import OrderFeedList from '../../components/orders/order-feed-list/order-feed-list'


const ProfileOrders = (): JSX.Element => {

  const dispatch = useDispatch();
  const userFeedData = useSelector((state) => state.wsUserOrdersReducer); 

  const userOrders = userFeedData.messages.orders;
 
  React.useEffect(() => {
    console.log("Loading user orders from server")
    dispatch({type: USER_ORDERS_WS_CONNECTION_START, payload: {url: API_GET_ORDER, sendToken: true}});     
    return () => {
        dispatch({ type: USER_ORDERS_WS_CONNECTION_CLOSED });
    }
  },[]);




  return(
    <OrderFeedList orderList = {userOrders} showStatus = {true} isUserProfile = {true}/>
  )
}

export default ProfileOrders