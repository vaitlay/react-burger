import styles from '../page.module.css';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useEffect } from 'react';
import { Outlet } from 'react-router'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  ProfileForm  from './profile-form.jsx';

import { getUserData, patchUserData, logout } from '../../services/actions/auth.js';
import { ROUTE_PROFILE, ROUTE_ORDERS, ROUTE_LOGOUT, ROUTE_ROOT } from '../../utils/route-endpoints.js';


const ProfilePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { requestSuccess, loggedIn, isLoading, hasError, errorMessage, user } = useSelector(state => state.authReducer);
  
  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    dispatch(getUserData());
  }, [])

  return (
    <div className={styles.profileContainer}>
      <nav className={styles.profileNav}>
        <ul>
          <li>
            <NavLink 
              to={ROUTE_PROFILE} 
              style={{ textDecoration: 'inherit' }}
              className = {({isActive}) => [isActive ? styles.profileNavActive : 'text_color_inactive', 'text text_type_main-medium'].join(' ')}      
              end
            >
              Профиль
            </NavLink>
          </li>
          <li className='mt-10'>
            <NavLink               
              to={ROUTE_ORDERS} 
              style={{ textDecoration: 'inherit' }}
              className = {({isActive}) => [isActive ? styles.profileNavActive : 'text_color_inactive', 'text text_type_main-medium'].join(' ')} 
            >
              История заказов
            </NavLink>
          </li>
          <li onClick = {handleLogout} className='mt-10'>
            <NavLink            
              to={ROUTE_ROOT} 
              style={{ textDecoration: 'inherit' }}
              className = {({isActive}) => [isActive ? styles.profileNavActive : 'text_color_inactive', 'text text_type_main-medium'].join(' ')} 
            >
              Выход
            </NavLink>
          </li>
          <li className='mt-30'>
            <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
          </li>
        </ul>

      </nav>
      <Outlet />
    </div>           
        
  )
}

export default ProfilePage;