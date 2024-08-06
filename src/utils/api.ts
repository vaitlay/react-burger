import { request } from './request'
import { TIngredientItem } from '../types';


export const API_FORGOT_PASSWORD = 'password-reset'
export const API_RESET_PASSWORD = 'password-reset/reset'
export const API_LOGIN = 'auth/login'
export const API_REGISTER = 'auth/register'
export const API_LOGOUT = 'auth/logout'
export const API_UPDATE_TOKEN = 'auth/token'
export const API_USER_DATA = 'auth/user'

export const API_LOAD_INGREDIENTS = 'ingredients'
export const API_ADD_ORDER = 'orders'


type TIngredientResponse = { data: Array<TIngredientItem> };
type TRefreshToken = { 
  accessToken: string;
  refreshToken: string;
}
type TMessage = { message: string }
type TUser = {
  email: string;
  name: string;
}
type TAuthSuccess = TUser & TRefreshToken

export const loadIngredientsDataRequest = () => {
  return request<TIngredientResponse>(API_LOAD_INGREDIENTS);
}


export const addCurrentOrderRequest = (orderData: Array<string>) => {
  return request<void>(API_ADD_ORDER, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: orderData})
  });
}

export const forgotPasswordRequest = ({ email }: { email: string }) => {
  return request<TMessage>(API_FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email })
  });
}

export const resetPasswordRequest = ({ newPassword, token }: { newPassword: string, token: string }) => {
  return request<TMessage>(API_RESET_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: newPassword, token: token})
  });   
}
  
export const loginRequest = ({ email, password }: { email: string, password: string }) => {
  return request<TAuthSuccess>(API_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
}

export const registerRequest = ({ email, password, name }: { email: string, password: string, name: string }) => {
  return request<TAuthSuccess>(API_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  });    
}

export const logoutRequest = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return request<TMessage>(API_LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token : refreshToken })
  })
}



export const getUserDataRequest = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return Promise.reject('no Token');
  return request<TUser>(API_USER_DATA, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization' : 'Bearer ' + accessToken
    }
  })
    .catch(err => {
      if (err.message === "jwt malformed" || err.message === "jwt expired" ) {
        checkTokenExpire();
        const newAccessToken = localStorage.getItem('accessToken');
        console.log('Updating refreshToken...');
        return request(API_USER_DATA, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + newAccessToken
          }
        })
      } else {
        return Promise.reject(err.message);
      }
    })
}   

export const patchUserDataRequest = (user: { name: string, email: string, password: string}) => {
    const accessToken = localStorage.getItem('accessToken');
    return request<TUser>(API_USER_DATA, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization' : 'Bearer ' + accessToken
      },
      body: JSON.stringify(user)
    })
  }   



const checkTokenExpire = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return request<TRefreshToken>(API_UPDATE_TOKEN, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
  })
    .then(data => {
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
      //return data.accessToken
    })
    .catch(err => {
      return null
    })
}
