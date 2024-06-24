import React from 'react'
import {useState } from 'react';
import AppHeader from '../app-header/header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/ingredients/burger-ingredients.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor/burger-constructor.jsx'
import mainStyle from './app.module.css'





function App() {

  const [loadingState, setLoadingState] = useState({ data: null, isLoading: true, hasError: false, errorMessage: ''});
  const IngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

  const loadIngredientsData = async () => {
    setLoadingState({...loadingState, isLoading: true});
    try {
      const res = await fetch(IngredientsUrl);
      if (res.status >= 400) throw Error(`Ошибка соединения с сервером: ${res.statusText}`);
      const data = await res.json();
      if (data.length === 0 ) throw Error('Нет данных от сервера');
      setLoadingState({...loadingState, isLoading: false, data: data.data})
    }
    catch (err) {
      setLoadingState({ ...loadingState, hasError: true, isLoading: false, errorMessage: err});
      console.log(`Ошибка - ${err}`);
    } 
  }
  

  React.useEffect(() => {
    loadIngredientsData();
  }, []);

  if (loadingState.isLoading) return <p>Идёт загрузка данных с сервера</p>
  else if (loadingState.hasError) return <p >{`${loadingState.errorMessage}`}</p>
  else {
    return (
    <>
      <AppHeader />
      <main className = {mainStyle.container}>  
        <BurgerIngredients ingredients = {loadingState.data}/>
        <BurgerConstructor ingredients = {loadingState.data}/>
        <div id="modals"></div>
      </main>
    </> 
    ) 
  }
}

export default App
