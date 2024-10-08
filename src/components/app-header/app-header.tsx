import headerStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { ROUTE_PROFILE, ROUTE_FEED, ROUTE_ROOT } from '../../utils/route-endpoints.js'

const AppHeader: FC = () => {
  return (
    <header className = {headerStyles.header}>
      <div className = {headerStyles.leftNav}>
        <NavLink 
          to={ROUTE_ROOT} end 
          data-testid = 'burgerConstructor'
          className = {`text text_type_main-default ${headerStyles.navItem}`} 
        >{({ isActive }) => (
          <>
            <BurgerIcon type= {isActive? 'primary' : 'secondary'}/>
            <p className = {isActive? 'ml-2' : 'ml-2 text_color_inactive'}>Конструктор</p>
          </>
        )}
        </NavLink>
        <NavLink to={ROUTE_FEED} 
          data-testid = 'feed'
          className = {`text text_type_main-default ml-6 ${headerStyles.navItem}`} 
        >{({ isActive }) => (
          <>
            <ListIcon type= {isActive? 'primary' : 'secondary'} />
            <p className = {isActive? 'ml-2' : 'ml-2 text_color_inactive'}>Лента заказов</p>
          </>
        )}
        </NavLink>
      </div>
      <Logo />
      <NavLink  to={ROUTE_PROFILE} 
        data-testid = 'profile'
        className = {`text text_type_main-default ${headerStyles.navItem}`} 
      >{({ isActive }) => (
        <>
          <ProfileIcon type= {isActive? 'primary' : 'secondary'}/>
          <p className = {isActive? 'ml-2' : 'ml-2 text_color_inactive'}>Личный кабинет</p>
        </>
      )}
      </NavLink>
    </header>
    )
  }

export default AppHeader;