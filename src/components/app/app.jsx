import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { loadIngredientsData } from '../../services/actions/load-ingredients-data.js'
import AppHeader from '../app-header/header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/ingredients/burger-ingredients.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor/burger-constructor.jsx'
import mainStyle from './app.module.css'



function App() {

  const IngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';
  const { isLoading, hasError, errorMessage } = useSelector(state => state.loadIngredientsReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("Loading Ingredients...")
    dispatch(loadIngredientsData(IngredientsUrl))
  },[dispatch]);

  if (isLoading) return <p>Идёт загрузка данных с сервера</p>
  else if (hasError) return <p>{`${errorMessage}`}</p>
  else {
    return (
    <>
      <AppHeader />
      <main className = {mainStyle.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </> 
    ) 
  }
}

export default App
