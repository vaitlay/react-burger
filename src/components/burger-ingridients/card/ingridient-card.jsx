import React from 'react'
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './ingridient-card.module.css';
import Price from '../../price/price.jsx';


class IngridientCard extends React.Component{

  render() {
    return (
      <div className = {`m-4 ${cardStyles.card}`}>
        {this.props.count === 0 ? null : <Counter count={this.props.count} size='default' extraClass='m-1' />}
        <img className='ml-2 mr-2' src={this.props.imageSrc} alt = 'картинка'/>
        <Price value = {this.props.price} className = 'm-3' />
        <p className={`${cardStyles.text} text text_type_main-small mt-1 mb-4`}>{this.props.ingridientName}</p>
      </div>
    )
  }
}

export default IngridientCard;