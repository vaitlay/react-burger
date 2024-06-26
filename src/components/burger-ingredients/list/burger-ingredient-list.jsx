import React from 'react'
import PropTypes from 'prop-types'
import IngredientCard from '../card/ingredient-card.jsx';
import listStyle from './burger-ingredient-list.module.css';
import {ingredientType} from '../../../utils/types.js'

const IngredientList = React.forwardRef(({ type, items }, tabHeaderRef) => {
  return (
    <>
      <h3 className = 'text text_type_main-medium mt-5' ref = {tabHeaderRef}>{type}</h3>
      <div className = {`p-0 ${listStyle.list}`}>
      {items.map(item => {
        return (
          <div className = 'item' key = {item._id}>
            <IngredientCard item = {item} count = {0}/>
          </div>
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
