import styles from '../page.module.css';
import { useEffect } from 'react';
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom';

import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { getUserData, logout } from '../../services/actions/auth';
import { ROUTE_PROFILE, ROUTE_ORDERS, ROUTE_ROOT } from '../../utils/route-endpoints';

const ProfilePage = () => {

  const dispatch = useDispatch();

  const { authChecked } = useSelector((state) => state.authReducer);
  
  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (!authChecked) dispatch(getUserData());
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
            <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные и просмотреть свою историю заказов</p>
          </li>
        </ul>

      </nav>
      <Outlet />
    </div>           
        
  )
}

export default ProfilePage;