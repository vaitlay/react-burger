import React from 'react'
import headerStyles from './app-header.module.css';
import NavItem from '../nav-item/nav-item.jsx'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className = {headerStyles.header}>
      <div className = {headerStyles.leftNav}>
        <NavItem link = ''><p className = 'text text_type_main-default m-2'>Конструктор</p><BurgerIcon type="primary"/></NavItem>
        <NavItem link = ''><p className = 'text text_type_main-default text_color_inactive m-2'>Лента заказов</p><ListIcon type="secondary"/></NavItem>
      </div>
      <Logo />
      <NavItem link = ''><ProfileIcon type="secondary"/><p className = 'text text_type_main-default text_color_inactive m-2'>Личный кабинет</p></NavItem>
    </header>
    )
  }

export default AppHeader;