import React from 'react'
import PropTypes from 'prop-types'
import IngredientCard from '../card/ingredient-card.jsx';
import listStyle from './burger-ingredient-list.module.css';
import {ingredientType} from '../../../utils/types.js'



class IngredientList extends React.Component{
  render() {
    return (
      <>
        <h3 className = 'text text_type_main-medium mt-5'>{this.props.type}</h3>
        <div className = {`p-0 ${listStyle.list}`}>
        {this.props.items.map(item => {
          return (
            <div className = 'item' key = {item._id}>
              <IngredientCard item = {item}/>
            </div>
          )
        })}
      </div>
      </>
    )
  }
}


IngredientList.propTypes = {
  type: PropTypes.string,
  items: PropTypes.arrayOf(ingredientType).isRequired
}

export default IngredientList;