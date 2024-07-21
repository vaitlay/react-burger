import PropTypes from 'prop-types'
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './ingredient-card.module.css';
import Price from '../../price/price.jsx';
import {ingredientType} from '../../../utils/types.js';
import IngredientDetails from '../../ingredient-details/ingredient-details.jsx'
import Modal from '../../modal/modal.jsx';
import { useModal } from '../../../hooks/useModal.js'
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd';
import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT }  from '../../../services/actions/ingredient-modal.js';

const IngredientCard = ({ item, count }) => {

  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  const [, draggedIngredientRef] = useDrag({
    type : item.type === 'bun'? 'bun' : 'betweenBunsItem',
    item : item
  });
  
  const handleCardOpen = () => {
    openModal();
    dispatch({type: SET_CURRENT_INGREDIENT, payload: item});
  }
  const handleCardClose = () => {
    closeModal();
    dispatch({type: CLEAR_CURRENT_INGREDIENT});
  }

  return (
    <li >
      <div className = {`m-4 ${cardStyles.card}` } onClick = {handleCardOpen} >
        {count ? <Counter count={count} className = {cardStyles.counter} size='default' extraClass='m-1' /> : null}
        <img className='ml-2 mr-2' src={item.image} alt = {item.name} ref = {draggedIngredientRef} />
        <Price value = {item.price} className = 'm-3' />
        <p className={`${cardStyles.text} text text_type_main-small mt-1 mb-4`}>{item.name}</p>
      </div> 

      
    </li>
  )
}

IngredientCard.propTypes = {
  item: ingredientType.isRequired,
  count : PropTypes.number
}

export default IngredientCard;


{/* <Modal header = 'Детали ингридиента' onClose = {handleCardClose}>
<IngredientDetails item={item}/>
</Modal>    */}