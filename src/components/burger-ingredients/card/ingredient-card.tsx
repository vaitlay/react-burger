import cardStyles from './ingredient-card.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientItem } from '../../../types'


import { useModal } from '../../../hooks/useModal'
import { useDispatch } from '../../../hooks/useDispatch';
import { useDrag } from 'react-dnd';
import { SET_CURRENT_INGREDIENT }  from '../../../services/actions/ingredient-modal';

import Price from '../../price/price';

const IngredientCard = ({ item, count }: { item: TIngredientItem, count: number}): JSX.Element => {

  const dispatch = useDispatch();
  const { openModal } = useModal();

  const [, draggedIngredientRef] = useDrag({
    type : item.type === 'bun'? 'bun' : 'betweenBunsItem',
    item : item
  });
  
  const handleCardOpen = () => {
    openModal();
    dispatch({type: SET_CURRENT_INGREDIENT, payload: item});
  }

  return (
    <li >
      <div className = {`m-4 ${cardStyles.card}` } onClick = {handleCardOpen} >
        {count ? <Counter count={count} extraClass = {`${cardStyles.counter} m-1`} size='default' /> : null}
        <img className='ml-2 mr-2' src={item.image} alt = {item.name} ref = {draggedIngredientRef} />
        <Price value = {item.price} className = 'm-3' />
        <p className={`${cardStyles.text} text text_type_main-small mt-1 mb-4`}>{item.name}</p>
      </div> 
    </li>
  )
}


export default IngredientCard;