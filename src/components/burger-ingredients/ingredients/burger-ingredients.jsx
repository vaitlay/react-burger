import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyles from './burger-ingredients.module.css';
import {ingredientsData} from '../../../utils/data.js';
import IngredientList from '../list/burger-ingredient-list.jsx';

const BurgerIngredients = ({ ingredients }) =>
{

  const buns = ingredients.filter(component => component.type === 'bun');
  const sauces = ingredients.filter(component => component.type === 'sauce');
  const mains = ingredients.filter(component => component.type === 'main');

  const [current, setCurrent] = React.useState('bun')
  




  return (
    <section className = {burgerStyles.section}>
      <h1 className = 'text text_type_main-large'>Соберите бургер</h1>
      <div className = {burgerStyles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <section className={`custom-scroll ${burgerStyles.scroll}`}>  
        {current === 'bun' && <IngredientList type = 'Булки' items = {buns}/>}
        {current === 'sauce' && <IngredientList type = 'Соусы' items = {sauces}/>}
        {current === 'main' && <IngredientList type = 'Начинки' items = {mains}/>}
      </section>
    </section>
  )
}  

export default BurgerIngredients;


/*
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
*/