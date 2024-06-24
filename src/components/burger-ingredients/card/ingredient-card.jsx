import React from 'react'
import PropTypes from 'prop-types'
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './ingredient-card.module.css';
import Price from '../../price/price.jsx';
import {ingredientType} from '../../../utils/types.js';
import IngredientDetails from '../../ingredient-details/ingredient-details.jsx'


const IngredientCard = ({ item, count }) => {
  
  const [modalState, setModalState] = React.useState({ visible: false });

  
  const handleOpenModal = () => {
    setModalState({ visible: true });
    console.log('Modal Open')
  }

 
  const handleCloseModal = () => {
    setModalState({ visible: false });
    console.log('Modal Closed')
  }

  
  return (
    <li>
      <div className = {`m-4 ${cardStyles.card}` } onClick = {handleOpenModal} >
        {count === 0 ? null : <Counter count={count} className = {cardStyles.counter} size='default' extraClass='m-1' />}
        <img className='ml-2 mr-2' src={item.image} alt = {item.name}/>
        <Price value = {item.price} className = 'm-3' />
        <p className={`${cardStyles.text} text text_type_main-small mt-1 mb-4`}>{item.name}</p>
      </div> 
      {modalState.visible? <IngredientDetails  onClose = {handleCloseModal} item={item}/> : null }
    </li>
  )
}


IngredientCard.propTypes = {
  item: ingredientType.isRequired,
  count : PropTypes.number
}

export default IngredientCard;



/*
class IngredientCard extends React.Component{

  render() {
    return (
      <div className = {`m-4 ${cardStyles.card}`}>
        {this.props.count === 0 ? null : <Counter count={this.props.count} className = {cardStyles.counter} size='default' extraClass='m-1' />}
        <img className='ml-2 mr-2' src={this.props.item.image} alt = {this.props.item.name}/>
        <Price value = {this.props.item.price} className = 'm-3' />
        <p className={`${cardStyles.text} text text_type_main-small mt-1 mb-4`}>{this.props.item.name}</p>
      </div>
    )
  }
}
*/
