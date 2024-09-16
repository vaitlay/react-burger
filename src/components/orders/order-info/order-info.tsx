import orderInfoStyles from './order-info.module.css';
import orderFeedDataStyles from '../order-feed-data/order-feed-data.module.css'
import { useMemo, useEffect } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../price/price';

import { TOrder, TIngredientItem } from '../../../types'
import { useDispatch } from '../../../hooks/useDispatch'
import { useSelector } from '../../../hooks/useSelector'
import { loadIngredientsData } from '../../../services/actions/load-ingredients-data'


const OrderInfo = ({ order, showStatus }: { order: TOrder, showStatus: boolean }): JSX.Element => {  

  type TDistinctIngredient = TIngredientItem & {count? : number}; 
  const unknownIngredient: TIngredientItem = {
    _id: 'unknown',
    name: 'Неизвестный ингредиент',
    type: 'unknown',
    price: 0
  }
  const dispatch = useDispatch();

  const { ingredientsData, hasError, errorMessage } = useSelector((state) => state.loadIngredientsReducer);

  const orderIngredients  = useMemo(() => {
    return order.ingredients
      .map((orderIngr: string) => {
        let ingrData = ingredientsData.find((ingr: TIngredientItem) => ingr._id === orderIngr);
        return ingrData? ingrData : unknownIngredient;
      })
  },[order, ingredientsData]);

  const orderStatus = useMemo(() => {
    return order.status === "done"? "Выполнен" : order.status === "created" ? "Создан": "Готовится";
  },[order]);

  const totalPrice = useMemo(() => {
    return orderIngredients.reduce((sum, item) => sum + Number(item.price),0);
  },[orderIngredients])

  const countedOrderIngredients = useMemo(() => {
    const orderIngredientsWithCounts: Array<TDistinctIngredient> = [];
    orderIngredients
      .map(ingr => {
        let dIngredient: TDistinctIngredient | undefined = orderIngredientsWithCounts.find(dIngr => dIngr._id === ingr._id)
        if (dIngredient && dIngredient.count) {
          dIngredient.count++
        } else {
          orderIngredientsWithCounts.push({...ingr, ...{count: 1}})
        }
      })
    return orderIngredientsWithCounts;
    
  },[orderIngredients]);
  

  useEffect(() => {    
    if (ingredientsData.length === 0 && !hasError ) dispatch(loadIngredientsData());
  },[]);

  if (ingredientsData.length === 0) return <p>Идёт загрузка данных об ингредиентах с сервера</p>
  if (hasError) return <p>Ошибка при загрузке данных об ингридиентах: {errorMessage}</p>
  return (
    <div className = {orderInfoStyles.container}>
      <div className = {`text_type_digits-medium mb-10`} style = {{textAlign: "center"}}>#0{order.number}</div>
      <div className = {`text_type_main-medium mb-3`}>{order.name}</div>
      {showStatus && <div className = {`text_type_main-medium mb-15 ${order.status === "done" ? orderFeedDataStyles.feedReadyOrders : 'text_color_inactive'}`}>{orderStatus}</div>}
      <div className = {`text_type_main-medium mb-6`}>Состав:</div>
      <div className = {`mb-10`}>
        {countedOrderIngredients.map(ingr => {
          return (
            <li key = {ingr._id} className = {`mb-4 mr-6 ${orderInfoStyles.ingredientRow}`}>
              <div className = {orderInfoStyles.ingredient}>
                <div className = {`mr-4 ${orderFeedDataStyles.imageCircle}`}>
                  <img src = {ingr.image_mobile} alt={ingr.name}/>
                </div> 
                <div className = {`text_type_main-default`}>{ingr.name}</div>
              </div>
              <Price value = {`${ingr.count} x ${ingr.price}`}/>
            </li>
          )
        })
        }
      </div>
      <div className = {orderInfoStyles.ingredientRow}> 
        <FormattedDate className = {`text_type_main-default text_color_inactive`} date={new Date(order.updatedAt)} />  
        <Price value = {totalPrice ? totalPrice : 'ошибка'}/>
      </div>
    </div>
  )
}



export default OrderInfo;