import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { loadIngredientsData } from '../services/actions/load-ingredients-data.js'
import { getUserData } from '../services/actions/auth.js'
import BurgerIngredients from '../components/burger-ingredients/ingredients/burger-ingredients.jsx'
import BurgerConstructor from '../components/burger-constructor/burger-constructor/burger-constructor.jsx'


const MainPage = () => {
  const { isLoading, hasError, errorMessage } = useSelector(state => state.loadIngredientsReducer);
  const { authChecked } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    console.log("Loading Ingredients and try to login")
    dispatch(loadIngredientsData());
    if (!authChecked) dispatch(getUserData());
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