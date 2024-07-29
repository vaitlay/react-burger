import styles from '../page.module.css';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInput } from '../../hooks/useInput.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { patchUserData } from '../../services/actions/auth.js';


const ProfileForm = () => {

  const dispatch = useDispatch();
  const [currentName, onChangeName, setName] = useInput('');   
  const [currentLogin, onChangeLogin, setLogin] = useInput('');
  const [currentPassword, onChangePassword] = useInput('******');

  const { isLoading, hasError, errorMessage, user } = useSelector(state => state.authReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUserData({ name: currentName, email: currentLogin, password: currentPassword}));
  }

  const handleCancel = () => {
    setName(user.name);
    setLogin(user.email);
  }

  useEffect(() => {
    setName(user.name);
    setLogin(user.email);
  }, [user])

  return(
    <form className={`${styles.profileFormContainer} ml-15`} onSubmit={handleSubmit}>
    {isLoading && <p>Отправка запроса ...</p>}
    {hasError && <p>{errorMessage}. Что-то пошло не так...</p>}
    <Input type={'text'}
      placeholder={'Имя'}
      icon="EditIcon"
      size={'default'}
      value={currentName}
      extraClass="mt-6"
      onChange={onChangeName}
    />
    <EmailInput type={'text'}
      placeholder={'E-mail'}
      icon="EditIcon"
      value={currentLogin}
      size={'default'}
      extraClass="mt-6"
      onChange={onChangeLogin}
    />
    <PasswordInput
      onChange={onChangePassword}
      value={currentPassword}
      name={'password'}
      icon="EditIcon"
      extraClass="mt-6"
    />
    <div className = {styles.profileFormButtons}>
      <Button htmlType="button" onClick = {handleCancel} type="secondary" size="medium" extraClass = 'mt-6'>Отмена</Button>
      <Button htmlType="submit" type="primary" size="medium" extraClass = 'mt-6 ml-3'>Сохранить</Button>
    </div>
  </form>
  )
}

export default ProfileForm