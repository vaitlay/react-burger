import styles from './page.module.css';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useEffect } from 'react';
import { useInput } from '../hooks/useInput.js';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { register, getUserData } from '../services/actions/auth.js';
import { ROUTE_LOGIN, ROUTE_ROOT } from '../utils/route-endpoints.js';


const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentName, onChangeName] = useInput();
  const [currentEmail, onChangeEmail] = useInput();
  const [currentPassword, onChangePassword] = useInput();

  const { requestSuccess, isLoading, hasError, errorMessage, loggedIn } = useSelector(state => state.authReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({
      email: currentEmail,
      password: currentPassword,
      name: currentName
    }));
    if (!hasError) alert('Пользователь зарегистрирован');
  }
  if (isLoading) return <p>Отправка запроса на сервер</p>
  if (hasError && errorMessage !== 'no Token') return <p>{errorMessage}. Что-то пошло не так...</p>
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <p className='text text_type_main-medium'>Регистрация</p>
      <Input type={'text'}
        value={currentName}
        onChange={onChangeName}
        placeholder={'Имя'}
        size={'default'}
        extraClass="mt-6"
      />
      <EmailInput
        name={'email'}
        value={currentEmail}
        onChange={onChangeEmail}
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        name={'password'}
        placeholder={'Пароль'}
        value={currentPassword}
        onChange={onChangePassword}
        extraClass="mt-6"
      />
      <Button htmlType='submit' type='primary' size='large' extraClass='mt-6'>Зарегистрироваться</Button>
      <p className='text text_type_main_default text_color_inactive mt-20'>
        Уже зарегистрированы?
        <Link to={ROUTE_LOGIN} className='ml-2' >Войти</Link>
      </p>
    </form>
  )
}

export default RegisterPage;