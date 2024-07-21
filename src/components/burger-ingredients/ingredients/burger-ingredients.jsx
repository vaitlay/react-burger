import burgerStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import { useRef, useState} from 'react';
import { useSelector } from 'react-redux';

import IngredientList from '../list/burger-ingredient-list.jsx';

const BurgerIngredients = () =>
{
  const { ingredientsData } = useSelector(state => state.loadIngredientsReducer);

  const buns = ingredientsData.filter(component => component.type === 'bun');
  const sauces = ingredientsData.filter(component => component.type === 'sauce');
  const mains = ingredientsData.filter(component => component.type === 'main');

  const tabHeaderRefs = {
    'bun' : useRef(null),
    'sauce' : useRef(null),
    'main' : useRef(null)
  }
  const [currentTab, setCurrentTab] = useState('bun')

  //Доработка интерфейса навигации по ингредиентам
  const srollToSelectedTab = (tabValue) => {
    setCurrentTab(tabValue);
    tabHeaderRefs[tabValue].current.scrollIntoView();
  }
  

  const onScroll = (e) => {
    const ingredientListPos = document.getElementById('ingredientListSection').offsetTop;
    const currentScrollRelativePos = e.currentTarget.scrollTop + ingredientListPos;
    const bunsScrollRelativePos = Math.abs(tabHeaderRefs['bun'].current.offsetTop - currentScrollRelativePos);
    const saucesScrollRelativePos = Math.abs(tabHeaderRefs['sauce'].current.offsetTop - currentScrollRelativePos);
    const mainsScrollRelativePos = Math.abs(tabHeaderRefs['main'].current.offsetTop - currentScrollRelativePos);
   
    let minDistance = Math.min(bunsScrollRelativePos, saucesScrollRelativePos, mainsScrollRelativePos);
    if (minDistance === bunsScrollRelativePos) setCurrentTab('bun')
    if (minDistance === saucesScrollRelativePos) setCurrentTab('sauce')
    if (minDistance === mainsScrollRelativePos) setCurrentTab('main')
  }
  //-------------------------------------------------

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
      <section id = 'ingredientListSection' className={`custom-scroll ${burgerStyles.scroll}`} onScroll = {onScroll}>  
        {<IngredientList type = 'bun' ref = {tabHeaderRefs.bun} items = {buns}/>}
        {<IngredientList type = 'sauce' ref = {tabHeaderRefs.sauce} items = {sauces}/>}
        {<IngredientList type = 'main' ref = {tabHeaderRefs.main} items = {mains}/>}
      </section>
    </section>
  )
}  

export default BurgerIngredients;
