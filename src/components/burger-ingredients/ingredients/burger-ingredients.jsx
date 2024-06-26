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

  const tabHeaderRefs = {
    'bun' : React.useRef(null),
    'sauce' : React.useRef(null),
    'main' : React.useRef(null)
  }

  const [currentTab, setCurrentTab] = React.useState('bun')

  const srollToSelectedTab = (tabValue) => {
    setCurrentTab(tabValue);
    tabHeaderRefs[tabValue].current.scrollIntoView();
  }

  return (
    <section className = {burgerStyles.section}>
      <h1 className = 'text text_type_main-large'>Соберите бургер</h1>
      <div className = {burgerStyles.tabs}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={srollToSelectedTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={srollToSelectedTab}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={srollToSelectedTab}>
          Начинки
        </Tab>
      </div>
      <section className={`custom-scroll ${burgerStyles.scroll}`}>  
        {<IngredientList type = 'Булки' ref = {tabHeaderRefs.bun} items = {buns}/>}
        {<IngredientList type = 'Соусы' ref = {tabHeaderRefs.sauce} items = {sauces}/>}
        {<IngredientList type = 'Начинки' ref = {tabHeaderRefs.main} items = {mains}/>}
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