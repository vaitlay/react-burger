import React from 'react'
import PropTypes from 'prop-types'
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './ingredient-card.module.css';
import Price from '../../price/price.jsx';
import {ingredientType} from '../../../utils/types.js';
import IngredientDetails from '../../ingredient-details/ingredient-details.jsx'
import Modal from '../../modal/modal.jsx';
import { useModal } from '../../../hooks/useModal.js'

const IngredientCard = ({ item, count }) => {
  
  const { isModalOpen, openModal, closeModal } = useModal();
  
  return (
    <li>
      <div className = {`m-4 ${cardStyles.card}` } onClick = {openModal} >
        {count === 0 ? null : <Counter count={count} className = {cardStyles.counter} size='default' extraClass='m-1' />}
        <img className='ml-2 mr-2' src={item.image} alt = {item.name}/>
        <Price value = {item.price} className = 'm-3' />
        <p className={`${cardStyles.text} text text_type_main-small mt-1 mb-4`}>{item.name}</p>
      </div> 
      {isModalOpen &&
        <Modal header = 'Детали ингридиента' onClose = {closeModal}>
          <IngredientDetails item={item}/>
        </Modal>   
      }
    </li>
  )
}

IngredientCard.propTypes = {
  item: ingredientType.isRequired,
  count : PropTypes.number
}

export default IngredientCard;