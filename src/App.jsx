import React from 'react'

import AppHeader from './components/app-header/header/app-header.jsx'
import BurgerIngridients from './components/burger-ingridients/ingridients/burger-ingridients.jsx'
import BurgerConstructor from './components/burger-constructor/burger-constructor/burger-constructor.jsx'
import mainStyle from './app.module.css'



function App() {
  return (
    <main className = {mainStyle.container}>
      <AppHeader />
      <BurgerIngridients />
      <BurgerConstructor />
    </main>
  )
}

export default App
