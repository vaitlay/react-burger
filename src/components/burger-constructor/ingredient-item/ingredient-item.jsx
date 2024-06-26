import React from 'react'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredient-item.module.css';
import PropTypes from 'prop-types'

const IngredientItem = ({ type, name, price, imageSrc }) => {
  return (
    <div className = {itemStyles.item}> 
      { type ? null : <DragIcon type='primary'/>}
      <ConstructorElement extraClass = {`${type ? 'ml-8' : 'ml-2'} mt-2`}
        type={type}
        isLocked={!type ? false : true}
        text={`${name} ${type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : ''}`}
        price={price}
        thumbnail={imageSrc}
      />
    </div>     
  )
}




IngredientItem.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  imageSrc: PropTypes.string
}


export default IngredientItem;

/*
class IngredientItem extends React.Component{
  render() {
    return (
    <div className = {itemStyles.item}> 
      { this.props.type ? null : <DragIcon type='primary'/>}
      <ConstructorElement extraClass = {`${this.props.type ? 'ml-8' : 'ml-2'} mt-2`}
        type={this.props.type}
        isLocked={!this.props.type ? false : true}
        text={`${this.props.name} ${this.props.type === 'top' ? '(верх)' : this.props.type === 'bottom' ? '(низ)' : ''}`}
        price={this.props.price}
        thumbnail={this.props.imageSrc}
      />
    </div>  
    )
  }
}
*/