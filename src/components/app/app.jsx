import React from 'react'
import AppHeader from '../app-header/header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/ingredients/burger-ingredients.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor/burger-constructor.jsx'
import mainStyle from './app.module.css'



function App() {
  return (
    <>
      <AppHeader />
      <main className = {mainStyle.container}>  
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>  
  )
}

export default App
