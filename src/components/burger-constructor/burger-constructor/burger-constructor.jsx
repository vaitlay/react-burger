import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useModal } from '../../../hooks/useModal.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { useDrop } from 'react-dnd';
import { addIngredient, addBuns, CLEAR_INGREDIENTS} from '../../../services/actions/constructor-list.js';
import listStyles from './burger-constructor.module.css';
import IngredientItem from '../ingredient-item/ingredient-item.jsx';
import Price from '../../price/price.jsx';
import OrderDetails from '../../order-details/order-details.jsx'
import Modal from '../../modal/modal.jsx'
import { ROUTE_LOGIN } from '../../../utils/route-endpoints.js'

const BurgerConstructor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { buns, ingredients } = useSelector(state => state.constructorListReducer);
  const { orderId, hasError } = useSelector(state => state.addOrderReducer);
  const { loggedIn } = useSelector(state => state.authReducer);
  
  const calculatedTotal = React.useMemo(() => {
    return buns.reduce((sum, item) => sum + Number(item.price),0) + ingredients.reduce((sum, item) => sum + Number(item.price),0);
  },[buns, ingredients])
  
  const { isModalOpen, openModal, closeModal } = useModal();

  const [, dropBetweenBunsItemRef] = useDrop({
    accept: 'betweenBunsItem',
    drop(betweenBunsItem) {
      dispatch(addIngredient(betweenBunsItem));
    },
  });

  const [, dropBunsRef] = useDrop({
    accept: 'bun',
    drop(bun) {
        dispatch(addBuns(bun));
    },
  });  

  const handleAddOrder = () => {
    if (!loggedIn) {   
      navigate(ROUTE_LOGIN);
    } else {
      openModal();
    }
  }

  return (
    <section className = {`${listStyles.container} mt-20 ml-5`} >
      <div ref = {dropBunsRef}>
      <IngredientItem ingredient = {buns[0]} />
      </div>
      <div className = {listStyles.betweenBunsSpace} ref = {dropBetweenBunsItemRef}>
      {ingredients.map((item, index) => {
        return <IngredientItem key = {item.id} ingredient = {item} />
      })}
      </div>
      <IngredientItem ingredient = {buns[1]} />
      <div className = {`${listStyles.submitContainer} mt-10`}>
        <Price value = {`${calculatedTotal}`} size = 'medium' />
        <Button 
          htmlType="button" 
          type="primary" 
          size="large" 
          extraClass = 'ml-10 mr-4' 
          onClick = {handleAddOrder} 
          disabled = {buns[0].id === 'defaultTopBunId' ? true : false}
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