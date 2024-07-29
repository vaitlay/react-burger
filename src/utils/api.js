import { request } from './request.js'

export const API_FORGOT_PASSWORD = 'password-reset'
export const API_RESET_PASSWORD = 'password-reset/reset'
export const API_LOGIN = 'auth/login'
export const API_REGISTER = 'auth/register'
export const API_LOGOUT = 'auth/logout'
export const API_UPDATE_TOKEN = 'auth/token'
export const API_USER_DATA = 'auth/user'

export const API_LOAD_INGREDIENTS = 'ingredients'
export const API_ADD_ORDER = 'orders'

export const loadIngredientsDataRequest = () => {
  return request(API_LOAD_INGREDIENTS);
}


export const addCurrentOrderRequest = (orderData) => {
  return request(API_ADD_ORDER, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: orderData})
  });
}

export const forgotPasswordRequest = ({ email }) => {
  return request(API_FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email })
  });
}

export const resetPasswordRequest = ({ newPassword, token }) => {
  return request(API_RESET_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: newPassword, token: token})
  });   
}
  
export const loginRequest = ({ email, password }) => {
  return request(API_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
}

export const registerRequest = ({ email, password, name }) => {
  return request(API_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  });    
}

export const logoutRequest = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return request(API_LOGOUT, {
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
  return request(API_USER_DATA, {
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

export const patchUserDataRequest = (user) => {
    const accessToken = localStorage.getItem('accessToken');
    return request(API_USER_DATA, {
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
  return request(API_UPDATE_TOKEN, {
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
