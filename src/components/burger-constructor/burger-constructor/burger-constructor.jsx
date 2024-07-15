import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useModal } from '../../../hooks/useModal.js'
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addIngredient, addBuns, CLEAR_INGREDIENTS} from '../../../services/actions/constructor-list.js';
import listStyles from './burger-constructor.module.css';
import IngredientItem from '../ingredient-item/ingredient-item.jsx';
import Price from '../../price/price.jsx';
import OrderDetails from '../../order-details/order-details.jsx'
import Modal from '../../modal/modal.jsx'

const BurgerConstructor = () => {

  const dispatch = useDispatch();

  const { buns, ingredients } = useSelector(state => state.constructorListReducer);
  const { orderId, hasError } = useSelector(state => state.addOrderReducer);
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

  const handleCloseOrder = () => {
    closeModal();
    if (orderId && !hasError) dispatch({ type : CLEAR_INGREDIENTS });
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
          onClick = {openModal} 
          disabled = {buns[0].id === 'defaultTopBunId' ? true : false}
        >Оформить заказ
        </Button>
      </div>
      
      {isModalOpen &&
        <Modal header = '' onClose = {handleCloseOrder}>
          <OrderDetails />
        </Modal> 
      }
    </section>  
  )

}
export default BurgerConstructor;