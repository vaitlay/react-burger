import styles from './page.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useEffect } from 'react';
import { useInput } from '../hooks/useInput.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetPassword } from '../services/actions/auth.js';
import { ROUTE_LOGIN } from '../utils/route-endpoints.js';


const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, hasError, errorMessage, resetPasswordSuccess } = useSelector(state => state.authReducer);
  const [currentPassword, onChangePassword] = useInput();
  const [currentToken, onChangeToken] = useInput();

  useEffect(() => {
    if (!location.state) navigate(ROUTE_LOGIN);
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({
      newPassword: currentPassword,
      token: currentToken
    }));
  }

  useEffect(() => {
    if (resetPasswordSuccess) {
      alert('Пароль изменён');
      navigate(ROUTE_LOGIN)
    }
  },[resetPasswordSuccess])

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>
      <PasswordInput 
        name={'password'}
        placeholder={'Пароль'}
        value={currentPassword}
        onChange={onChangePassword}
        extraClass="mt-6"
      />
      <Input type={'text'}
        placeholder={'Введите код из письма'}
        value={currentToken}
        size={'default'}
        extraClass="mt-6"
        onChange={onChangeToken}
      />
      <Button htmlType='submit' type='primary' size='large' extraClass='mt-6' >Сохранить</Button>
      {isLoading && <p>Loading...</p>}
      {hasError.resetPassword && <p>{errorMessage}. Попробуйте лучше вспомнить пароль</p>}
      <p className='text text_type_main_default text_color_inactive mt-4'>
        Вспомнили пароль?
        <Link to={'/login'} className='ml-2' style={{ textDecoration: 'inherit' }}>Войти</Link>
      </p>
    </form>
  )
}

export default ResetPasswordPage;