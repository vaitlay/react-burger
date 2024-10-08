import styles from './page.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link } from 'react-router-dom';
import { useSelector } from '../hooks/useSelector';
import { useDispatch } from '../hooks/useDispatch';
import { useInput } from '../hooks/useInput';
import { ROUTE_FORGOT_PASSWORD, ROUTE_REGISTER } from '../utils/route-endpoints';
import { login } from '../services/actions/auth';

const LoginPage = (): JSX.Element => {

  const dispatch = useDispatch();
  const [ currentEmail, onChangeEmail ] = useInput();
  const [ currentPassword, onChangePassword ] = useInput();
  const { isLoading, hasError, errorMessage } = useSelector((state) => state.authReducer); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: currentEmail, password: currentPassword })); 
  }
  

  return (
    <form className = {styles.formContainer} onSubmit = {handleSubmit}>
      <p className = 'text text_type_main-medium'>Вход</p>
      <EmailInput
        name={'email'}
        isIcon={false}
        placeholder={'E-mail'}
        extraClass="mt-6"
        value={currentEmail}
        onChange = {onChangeEmail}
      />
      <PasswordInput 
        placeholder={'Пароль'}
        name={'password'}
        value={currentPassword}
        onChange = {onChangePassword}
        extraClass="mt-6"
        
      />
      <Button htmlType='submit' type='primary' size='large' extraClass='mt-6'>Войти</Button>
      { isLoading && <p>Авторизация ...</p> }
      { hasError.login && <p>{errorMessage} Что-то пошло не так...</p>}
      <p className = 'text text_type_main_default text_color_inactive mt-20'>
        Вы - новый пользователь?
        <Link to = {ROUTE_REGISTER} className = 'ml-2' style={{ textDecoration: 'inherit' }}>Зарегистрироваться</Link>
      </p>
      <p className = 'text text_type_main_default text_color_inactive mt-4'>
        Забыли пароль?
        <Link to = {ROUTE_FORGOT_PASSWORD} className = 'ml-2' style={{ textDecoration: 'inherit' }}>Восстановить пароль</Link>
      </p>

    </form>
  )
}

export default LoginPage;