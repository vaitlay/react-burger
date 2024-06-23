import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyles from './burger-ingredients.module.css';
import {ingredientsData} from '../../../utils/data.js';
import IngredientList from '../list/burger-ingredient-list.jsx';

const buns = ingredientsData.filter(component => component.type === 'bun');
const sauces = ingredientsData.filter(component => component.type === 'sauce');
const mains = ingredientsData.filter(component => component.type === 'main');


class BurgerIngredients extends React.Component{
  render() {
    return (
      <section className = {burgerStyles.section}>
        <h1 className = 'text text_type_main-large'>Соберите бургер</h1>
        <div className = {burgerStyles.tabs}>
          <Tab value="bun" active={true} >
            Булки
          </Tab>
          <Tab value="sauce" active={false} >
            Соусы
          </Tab>
          <Tab value="main" active={false} >
            Начинки
          </Tab>
        </div>
        <section className={`custom-scroll ${burgerStyles.scroll}`}>  
          <IngredientList type = 'Булки' items = {buns}/>
          <IngredientList type = 'Соусы' items = {sauces}/>
          <IngredientList type = 'Начинки' items = {mains}/>
        </section>
      </section>
    )
  }
}

export default BurgerIngredients;