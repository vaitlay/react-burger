import orderFeedListStyles from './order-feed-list.module.css';

import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import { TOrder } from '../../../types'
import { useSelector } from '../../../hooks/useSelector';
import { useDispatch } from '../../../hooks/useDispatch';
import { ROUTE_FEED, ROUTE_PROFILE_ORDERS } from '../../../utils/route-endpoints';
import { loadIngredientsData } from '../../../services/actions/load-ingredients-data'

import OrderFeedData from '../order-feed-data/order-feed-data'


const OrderFeedList = ({ orderList, showStatus, isUserProfile }: {orderList: Array<TOrder>, showStatus: boolean, isUserProfile: boolean }): JSX.Element => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, ingredientsData, hasError, errorMessage } = useSelector((state) => state.loadIngredientsReducer);

  React.useEffect(() => { 
    if (ingredientsData.length === 0 && !hasError ) dispatch(loadIngredientsData());
  },[]); 


  if (isLoading) return <p>Загружаются данные об ингредиентах</p>
  else if (hasError) return <p>Ошибка при загрузке данных об ингредиентах {errorMessage}</p>
  else {
    return (
      <section className={`custom-scroll ${orderFeedListStyles.section} ${orderFeedListStyles.sectionScroll}`}>
        {orderList.map(order => { 
          return (
            <Link 
              to= {isUserProfile? `${ROUTE_PROFILE_ORDERS}/${order.number}` : `${ROUTE_FEED}/${order.number}`} 
              state ={{backgroundLocation : location}}
              key = {order._id} 
              className = 'mb-4 mr-2' 
              style={{ textDecoration: 'inherit', color: "white" }}>
                <OrderFeedData order = {order} ingredientsData = {ingredientsData} showStatus = {showStatus} />
              </Link>  
            )
          })
        }
      </section>
    )
  } 
}

export default OrderFeedList;
