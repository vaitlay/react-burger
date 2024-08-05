import styles from './page.module.css';
import { PasswordInput, EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useInput } from '../hooks/useInput';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { register } from '../services/actions/auth';
import { ROUTE_LOGIN } from '../utils/route-endpoints';
import { TAuth } from '../types';

const RegisterPage = () => {

  const dispatch = useDispatch();
  const [currentName, onChangeName] = useInput();
  const [currentEmail, onChangeEmail] = useInput();
  const [currentPassword, onChangePassword] = useInput();

  const { isLoading, hasError, errorMessage } = useSelector((state: any) => state.authReducer as TAuth); // доделать типизацию для redux

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({
      email: currentEmail,
      password: currentPassword,
      name: currentName
    }) as any ); // доделать типизацию для redux
    if (!hasError) alert('Пользователь зарегистрирован');
  }
  if (isLoading) return <p>Отправка запроса на сервер</p>
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
      {hasError.register && <p>{errorMessage}. Что-то пошло не так...</p>}
      <Button htmlType='submit' type='primary' size='large' extraClass='mt-6'>Зарегистрироваться</Button>
      <p className='text text_type_main_default text_color_inactive mt-20'>
        Уже зарегистрированы?
        <Link to={ROUTE_LOGIN} className='ml-2' style={{ textDecoration: 'inherit' }}>Войти</Link>
      </p>
    </form>
  )
}

export default RegisterPage;