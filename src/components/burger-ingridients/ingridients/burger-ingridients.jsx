import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyles from './burger-ingridients.module.css';
import {ingridientsData} from '../../../utils/data.js';
import IngridientList from '../list/burger-ingridient-list.jsx';
//import NavItem from '../nav-item/nav-item.jsx'
//import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const buns = ingridientsData.filter(component => component.type === 'bun');
const sauces = ingridientsData.filter(component => component.type === 'sauce');
const mains = ingridientsData.filter(component => component.type === 'main');


class BurgerIngridients extends React.Component{
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
          <IngridientList type = 'Булки' items = {buns}/>
          <IngridientList type = 'Соусы' items = {sauces}/>
          <IngridientList type = 'Начинки' items = {mains}/>
        </section>
      </section>
    )
  }
}

export default BurgerIngridients;