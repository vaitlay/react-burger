import styles from '../page.module.css';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../hooks/useInput.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { patchUserData } from '../../services/actions/auth.js';


const Orders = () => {

  const dispatch = useDispatch();

  return(
    <p>Страница заказов</p>
  )
}

export default Orders