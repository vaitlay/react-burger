import orderFeedDataStyles from './order-feed-data.module.css';
import { useMemo } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../price/price'

import { TOrder, TIngredientItem } from '../../../types'

const OrderFeedData = ({ order, ingredientsData, showStatus }: { order: TOrder, ingredientsData: Array<TIngredientItem>, showStatus: boolean }): JSX.Element => {  

  const orderIngredients = useMemo(() => {
    return order.ingredients.map(orderIngr => 
    ingredientsData
      .filter(ingr => ingr._id === orderIngr)[0]);
  },[order, ingredientsData]);

  const orderStatus = useMemo(() => {
    return order.status === "done"
    ? "Выполнен" 
    : order.status === "created"
      ? "Создан"
      : "Готовится";
  },[order]); 

   const calculateTotalPrice = useMemo(() => {
    return orderIngredients.reduce((sum, item) => sum + Number(item.price),0);
  },[orderIngredients])

  const distinctOrderIngredients = useMemo(() => {
    return orderIngredients
      .filter((ingr, index) => {
        return orderIngredients.indexOf(ingr) == index
      });
    },[orderIngredients]);
  
  return (
    <div className = {`${orderFeedDataStyles.container} p-6`}>
      <div className = {`${orderFeedDataStyles.header}`}>
        <p className = 'text_type_digits-default'>#0{order.number}</p>
        <FormattedDate className = 'text_type_main-default text_color_inactive' date={new Date(order.updatedAt)} />
      </div>
      <p className = 'text_type_main-default'>{order.name}</p>
      {showStatus && <div className = {`text_type_main-default mb-3 ${order.status === "done"? orderFeedDataStyles.readyStatus : '' }`}>{orderStatus}</div>}
      <div className = {`${orderFeedDataStyles.list}`}>
        <div className = {orderFeedDataStyles.imageList}>
          {distinctOrderIngredients.map( (ingr, index) => { 
          if (index <= 5) {
            return (            
              <li
                className = {orderFeedDataStyles.imageCircle}
                style={{left: -24*index+"px", zIndex: -1*index+100}}
                key = {ingr._id + index} 
              >
                {index < 5 && <img src = {ingr.image_mobile} alt={ingr.name}/>}
                {index === 5 && <img src = {ingr.image_mobile} alt={ingr.name + ' и т.д.'}/> }
                {index === 5 && distinctOrderIngredients.length - 6 > 0 && <span 
                  className = 'text_type_main-default' 
                  style = {{position: 'absolute', top: '18px'}}
                  >+{distinctOrderIngredients.length - 6}</span> }
              </li> 
            )
          }
          })}
      </div>
      <Price value={calculateTotalPrice} />
      </div>
    </div>
  )
}



export default OrderFeedData;