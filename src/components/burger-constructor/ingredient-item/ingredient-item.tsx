import itemStyles from './ingredient-item.module.css';
import dummyImg from '../../../images/dummy.png';
//import PropTypes from 'prop-types'
//import { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../../services/actions/constructor-list.js';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TConstructorItem } from '../../../types'

const IngredientItem = ({ ingredient }: { ingredient: TConstructorItem}): JSX.Element => {

  const dispatch = useDispatch();
  
  const removeIngredient = (id: string) :void => {
    dispatch({ type: REMOVE_INGREDIENT, payload: id});
  }

  const [, draggedIngredientRef] = useDrag({
    type : 'betweenBunsItemSort',
    item : ingredient
  });

  const [, dropIngredientRef] = useDrop({
    accept: 'betweenBunsItemSort',
    drop(betweenBunsItem) {
      dispatch({ 
        type: MOVE_INGREDIENT, 
        payload: {dropIngredient: ingredient , dragIngredient: betweenBunsItem }
      });
    },
  })
  return (
    <div className = {itemStyles.item} ref = {!ingredient.bunLocation ? (refDnd) => draggedIngredientRef(dropIngredientRef(refDnd)) : null}> 
      { ingredient.bunLocation ? null : <DragIcon type='primary'/>}
      <ConstructorElement extraClass = {`${ingredient.bunLocation ? 'ml-8' : 'ml-2'} mt-2`}
        type={ingredient.bunLocation}
        isLocked={!ingredient.bunLocation ? false : true}
        text={`${ingredient.name} ${ingredient.bunLocation === 'top' ? '(верх)' : ingredient.bunLocation === 'bottom' ? '(низ)' : ''}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile ? ingredient.image_mobile: dummyImg}
        handleClose={() => removeIngredient(ingredient.id)}
      />
    </div>     
  )
}

// IngredientItem.propTypes = {
//   bunLocation: PropTypes.string,
//   name: PropTypes.string,
//   price: PropTypes.number,
//   image_mobile: PropTypes.string
// }


export default IngredientItem;