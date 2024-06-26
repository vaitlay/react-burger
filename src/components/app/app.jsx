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
    return fetch(IngredientsUrl)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка соединения с сервером: ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        if (res.data.length === 0) {
          return Promise.reject('Нет данных от сервера')
        }
        return Promise.resolve(res.data);
      })
  };


  React.useEffect(() => {
    loadIngredientsData()
      .then(data => {
        setLoadingState({ data: data, isLoading: false, isError: false });
      })
      .catch(err => {
        setLoadingState({ data: null, isLoading: false, hasError: true, errorMessage: err });
      });
  }, []);
  

  if (loadingState.isLoading) return <p>Идёт загрузка данных с сервера</p>
  else if (loadingState.hasError) return <p>{`${loadingState.errorMessage}`}</p>
  else {
    return (
    <>
      <AppHeader />
      <main className = {mainStyle.container}>  
        <BurgerIngredients ingredients = {loadingState.data}/>
        <BurgerConstructor ingredients = {loadingState.data}/>
      </main>
    </> 
    ) 
  }
}

export default App
