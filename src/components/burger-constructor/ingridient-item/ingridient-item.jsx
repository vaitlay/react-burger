import React from 'react'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingridient-item.module.css';


class IngridientItem extends React.Component{
  render() {
    return (
    <div className = {itemStyles.item}> 
      { this.props.type ? null : <DragIcon type='primary'/>}
      <ConstructorElement extraClass = {`${this.props.type ? 'ml-8' : 'ml-2'} mt-2`}
        type={this.props.type}
        isLocked={!this.props.type ? false : true}
        text={this.props.name}
        price={this.props.price}
        thumbnail={this.props.imageSrc}
      />
    </div>  
    )
  }
}

export default IngridientItem;