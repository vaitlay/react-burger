import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { loadIngredientsData } from '../services/actions/load-ingredients-data'
import { getUserData } from '../services/actions/auth'
import BurgerIngredients from '../components/burger-ingredients/ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor/burger-constructor'
import { TAuth } from '../types';

const MainPage = () => {
  const { isLoading, hasError, errorMessage, authChecked } = useSelector((state: any) => state.loadIngredientsReducer as TAuth); // доделать типизацию для redux
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    console.log("Loading Ingredients and try to login")
    dispatch(loadIngredientsData() as any); // доделать типизацию для redux
    if (!authChecked) dispatch(getUserData() as any); // доделать типизацию для redux
  },[]);


  if (isLoading) return <p>Идёт загрузка данных с сервера</p>
  else if (hasError) return <p>{`${errorMessage}`}</p>
  else {
    return (
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
    ) 
  }
}

export default MainPage