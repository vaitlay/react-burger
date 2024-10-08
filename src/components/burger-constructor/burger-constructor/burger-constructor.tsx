import listStyles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useMemo } from 'react'
import { useModal } from '../../../hooks/useModal'
import { useSelector } from '../../../hooks/useSelector';
import { useDispatch } from '../../../hooks/useDispatch';
import { useNavigate } from 'react-router'
import { useDrop } from 'react-dnd';

import { addIngredient, addBuns } from '../../../services/actions/constructor-list';
import { addCurrentOrder } from '../../../services/actions/order-data';
import { ROUTE_LOGIN } from '../../../utils/route-endpoints'

import IngredientItem from '../ingredient-item/ingredient-item';
import Price from '../../price/price';
import OrderDetails from '../../orders/order-details/order-details'
import Modal from '../../modal/modal'

import { TAddOrderData, TIngredientItem } from '../../../types'

const BurgerConstructor = (): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn } = useSelector((state) => state.authReducer); 
  const { buns, ingredients } = useSelector((state) => state.constructorListReducer);
  
  const calculatedTotal = useMemo(() => {
    return buns.reduce((sum, item) => sum + Number(item.price),0) + ingredients.reduce((sum, item) => sum + Number(item.price),0);
  },[buns, ingredients])
  
  const { isModalOpen, openModal, closeModal } = useModal();

  const [, dropBetweenBunsItemRef] = useDrop({
    accept: 'betweenBunsItem',
    drop(betweenBunsItem: TIngredientItem) {
      dispatch(addIngredient(betweenBunsItem));
    },
  });

  const [, dropBunsRef] = useDrop({
    accept: 'bun',
    drop(bun: TIngredientItem) {
        dispatch(addBuns(bun));
    },
  });  


  const handleAddOrder = () => {
    if (!loggedIn) {   
      navigate(ROUTE_LOGIN);
    } else {
      console.log('Order sending...')
      openModal();
      const orderData: TAddOrderData = [];
      orderData.push(buns[0]._id)
      for (let ingr of ingredients) orderData.push( ingr._id );
      orderData.push(buns[1]._id)
      dispatch(addCurrentOrder(orderData));
    }
  }

  return (
    <section className = {`${listStyles.container} mt-20 ml-5`} >
      <div ref = {dropBunsRef} data-test-id = 'bunsConstructor'>
      <IngredientItem ingredient = {buns[0]} />
      </div>
      <div className = {listStyles.betweenBunsSpace} ref = {dropBetweenBunsItemRef} data-test-id = 'betweenBunsConstructor'>
      {ingredients.map((item, index) => {
        return <IngredientItem key = {item.id} ingredient = {item} />
      })}
      </div>
      <IngredientItem ingredient = {buns[1]} />
      <div className = {`${listStyles.submitContainer} mt-10`}>
        <Price value = {calculatedTotal}  />
        <Button 
          htmlType="button" 
          type="primary" 
          size="large" 
          extraClass = 'ml-10 mr-4' 
          onClick = {handleAddOrder} 
          disabled = {buns[0].id === 'defaultTopBunId' ? true : false}
          data-test-id = 'createOrderBtn'
        >Оформить заказ
        </Button>
      </div>
      
      {isModalOpen &&
        <Modal header = '' onClose = {closeModal}>
          <OrderDetails />
        </Modal> 
      }
    </section>  
  )

}
export default BurgerConstructor;