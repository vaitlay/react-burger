import styles from './page.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/auth.js';
import { ROUTE_LOGIN, ROUTE_RESET_PASSWORD } from '../utils/route-endpoints.js';
import { useInput } from '../hooks/useInput';
import { TAuth } from '../types';

const ForgotPasswordPage = (): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, hasError, errorMessage } = useSelector((state: any) => state.authReducer as TAuth);
  const [currentEmail, onChangeEmail] = useInput('example@email.com'); 

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email: currentEmail }) as any); //Доделать!
    navigate(ROUTE_RESET_PASSWORD, {state : {from : location}});
  }
  

  return (
    <form className = {styles.formContainer}  onSubmit = {handleSubmit}>
      <p className = 'text text_type_main-medium'>Восстановление пароля</p>
      <EmailInput
        value={currentEmail}
        name={'email'}
        placeholder={'Укажите е-mail'}
        extraClass="mt-6"
        onChange = {onChangeEmail}
      />
      <Button htmlType='submit' type='primary' size='large' extraClass='mt-6' >Восстановить</Button>
      { isLoading && <p>Отправка запроса на сервер</p> }
      { hasError.forgotPassword && <p>{errorMessage}. Попробуйте лучше вспомнить пароль</p> }
      <p className = 'text text_type_main_default text_color_inactive mt-4'>
        Вспомнили пароль?
        <Link to = {ROUTE_LOGIN} className = 'ml-2' style={{ textDecoration: 'inherit' }}>Войти</Link>
      </p>
    </form>
  )
}

export default ForgotPasswordPage;