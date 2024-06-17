import React from 'react'
import listStyles from './burger-constructor.module.css';
import IngredientItem from '../ingredient-item/ingredient-item.jsx';
import Price from '../../price/price.jsx';
import {ingredientsData} from '../../../utils/data.js';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';


const tempItems = ingredientsData.slice(1,12);
const tempBun = ingredientsData[0];
const total = tempItems.reduce((sum, item) => {return sum + Number(item.price)},0)  + 2 * tempBun.price;

class burgerConstructor extends React.Component{
  render() {
    return (
      <section className = {`${listStyles.container} mt-20 ml-5`} >
        <IngredientItem type = 'top' name = {tempBun.name} price = {tempBun.price} imageSrc = {tempBun.image_mobile} />
        <div className = {listStyles.betweenBunsSpace}>
        {tempItems.map((item, index) => {
          return <IngredientItem key = {index}  name = {item.name} price = {item.price} imageSrc = {item.image_mobile}/>
        })}
        </div>
        <IngredientItem type = 'bottom' name = {tempBun.name} price = {tempBun.price} imageSrc = {tempBun.image_mobile} />
        <div className = {`${listStyles.submitContainer} mt-10`}>
          <Price value = {`${total}`} size = 'medium' />
          <Button htmlType="button" type="primary" size="large" extraClass = 'ml-10 mr-4'>Оформить заказ</Button>
        </div>
        
      </section>  
    )
  }
}

export default burgerConstructor;
//--