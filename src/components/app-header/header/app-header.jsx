import headerStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { ROUTE_PROFILE, ROUTE_ORDERS, ROUTE_ROOT } from '../../../utils/route-endpoints.js'

const AppHeader = () => {
  return (
    <header className = {headerStyles.header}>
      <div className = {headerStyles.leftNav}>
        <NavLink 
          to={ROUTE_ROOT} end 
          className = {`text text_type_main-default ${headerStyles.navItem}`} 
        >{({ isActive }) => (
          <>
            <p className = {isActive? '' : 'text_color_inactive'}>Конструктор</p>
            <BurgerIcon type= {isActive? 'primary' : 'secondary'}/>
          </>
        )}
        </NavLink>
        <NavLink to={ROUTE_ORDERS} 
          className = {`text text_type_main-default ml-6 ${headerStyles.navItem}`} 
        >{({ isActive }) => (
          <>
            <p className = {isActive? '' : 'text_color_inactive'}>Лента заказов</p>
            <ListIcon type= {isActive? 'primary' : 'secondary'} />
          </>
        )}
        </NavLink>
      </div>
      <Logo />
      <NavLink  to={ROUTE_PROFILE} end
        className = {`text text_type_main-default ${headerStyles.navItem}`} 
      >{({ isActive }) => (
        <>
          <p className = {isActive? '' : 'text_color_inactive'}>Личный кабинет</p>
          <ProfileIcon type= {isActive? 'primary' : 'secondary'}/>
        </>
      )}
      </NavLink>
    </header>
    )
  }

export default AppHeader;