import React from 'react'
import PropTypes from 'prop-types'
import IngredientCard from '../card/ingredient-card.jsx';
import listStyle from './burger-ingredient-list.module.css';
import {ingredientType} from '../../../utils/types.js'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

const IngredientList = React.forwardRef(({ type, items }, tabHeaderRef) => {

  const location = useLocation();

  const listName = {
    'bun' : 'Булки',
    'sauce' : 'Соусы',
    'main' : 'Начинка'
  }
  const { buns, ingredients } = useSelector(state => state.constructorListReducer);
  const countItems = React.useMemo(() => {
    const itemsCounter = {};
    for (let ingr of ingredients) itemsCounter[ingr._id] ? itemsCounter[ingr._id]++ : itemsCounter[ingr._id] = 1;
    for (let bun of buns) itemsCounter[bun._id] ? itemsCounter[bun._id]++ : itemsCounter[bun._id] = 1;
    return itemsCounter;
  },[buns, ingredients]);


  return (
    <>
      <h3 className = 'text text_type_main-medium mt-5' ref = {tabHeaderRef}>{listName[type]}</h3>
      <div className = {`p-0 ${listStyle.list}`}>
      {items.map(item => {
        return (
          <Link 
            style = {{color: '#F2F2F2', textDecoration: 'none'}}
            key = {item._id} 
            to={`ingredient/${item._id}`} 
            state ={{backgroundLocation : location}}
          >
            <IngredientCard item = {item} count = {countItems[item._id]}/>
          </Link>
        )
      })}
      </div>
    </>    
  )
});


IngredientList.propTypes = {
  type: PropTypes.string,
  //tabHeader: PropTypes.string,
  items: PropTypes.arrayOf(ingredientType).isRequired
}

export default IngredientList;
