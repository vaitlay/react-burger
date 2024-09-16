import listStyle from './burger-ingredient-list.module.css';
import { TIngredientItem, TConstructorItem } from '../../../types'

import { useMemo, forwardRef } from 'react'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

import IngredientCard from '../card/ingredient-card';

type TIngredientList = {
  type: string;
  items: Array<TIngredientItem>
}

type TItemsCounter = {
  [name: string]: number; 
}

type TListName = {
  [name: string]: string;
}

const IngredientList = forwardRef<HTMLHeadingElement, TIngredientList>(({ type, items }, tabHeaderRef): JSX.Element => {

  const location = useLocation();

  const listName: TListName = {
    'bun' : 'Булки',
    'sauce' : 'Соусы',
    'main' : 'Начинка'
  }
  const { buns, ingredients } = useSelector((state: any) => state.constructorListReducer as {  //Позже доделать типизацию для redux
    buns: Array<TConstructorItem>, ingredients: Array<TConstructorItem> });


  const countItems = useMemo(() => {
    const itemsCounter: TItemsCounter = {};
    for (let ingr of ingredients) itemsCounter[ingr._id] ? itemsCounter[ingr._id]++ : itemsCounter[ingr._id] = 1;
    for (let bun of buns) itemsCounter[bun._id] ? itemsCounter[bun._id]++ : itemsCounter[bun._id] = 1;
    return itemsCounter;
  },[buns, ingredients]);


  return (
    <>
      <h3 className = 'text text_type_main-medium mt-5' ref = {tabHeaderRef}>{listName[type]}</h3>
      <div className = {`p-0 ${listStyle.list}`}>
      {items.map(item => {
        return (
          <Link 
            style = {{color: '#F2F2F2', textDecoration: 'none'}}
            key = {item._id} 
            to={`ingredient/${item._id}`} 
            state ={{backgroundLocation : location}}
          >
            <IngredientCard item = {item} count = {countItems[item._id]}/>
          </Link>
        )
      })}
      </div>
    </>    
  )
});


export default IngredientList;
