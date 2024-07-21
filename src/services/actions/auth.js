import { 
  forgotPasswordRequest,
  resetPasswordRequest,
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserDataRequest,
  patchUserDataRequest
} from '../../utils/api.js'

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST'
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED'

export const PATCH_USER_DATA_SUCCESS = 'POST_USER_DATA_SUCCESS'
export const PATCH_USER_DATA_REQUEST = 'POST_USER_DATA_REQUEST'
export const PATCH_USER_DATA_FAILED = 'POST_USER_DATA_FAILED'

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export const forgotPassword = ({ email }) => {
  return function(dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    forgotPasswordRequest({ email })
      .then(data => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          payload: err.message
        })
      })
  }
}

export const resetPassword = ({ newPassword, token }) => {
  return function(dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPasswordRequest({ newPassword, token })
      .then(data => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: err.message
        })
      })
  }
}

export const login = ({ email, password }) => {
  return function(dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest({ email, password })
      .then(data => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data
        })
        localStorage.setItem("accessToken", data.accessToken.split('Bearer ')[1]);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
          payload: err.message
        })
      })
      .finally(() => dispatch({type: SET_AUTH_CHECKED}))
  }
}

export const register = ({ email, password, name }) => {
  return function(dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    registerRequest({ email, password, name })
      .then(data => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data
        })
        localStorage.setItem("accessToken", data.accessToken.split('Bearer ')[1]);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch(err => {
        dispatch({
          type: REGISTER_FAILED,
          payload: err.message
        })
      })
      .finally(() => dispatch({type: SET_AUTH_CHECKED}))
  }
}

export const logout = () => {
  return function(dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logoutRequest()
      .then(data => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: data
        })
        localStorage.setItem("accessToken", '');
        localStorage.setItem("refreshToken", '');
      })
      .catch(err => {
        dispatch({
          type: LOGOUT_FAILED,
          payload: err.message
        })        
      })
  }
}

export const getUserData = () => {
  return function(dispatch) {
    dispatch({ type: GET_USER_DATA_REQUEST });
    return getUserDataRequest()
      .then(data => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_USER_DATA_FAILED,
          payload: err
        })
        localStorage.setItem("accessToken", '');
        localStorage.setItem("refreshToken", '');
      })
      .finally(() => dispatch({type: SET_AUTH_CHECKED}))
  }
}

export const patchUserData = (user) => {
  return function(dispatch) {
    dispatch({ type: PATCH_USER_DATA_REQUEST });
    return patchUserDataRequest(user)
      .then(data => {
        dispatch({
          type: PATCH_USER_DATA_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: PATCH_USER_DATA_FAILED,
          payload: err.message
        })
      })
  }
  
}







// export function authQuery(endpointApi, actionType, method = 'GET', body = '', accessToken = '') {

//   const headers = {'Content-Type': 'application/json'};
//   if (accessToken) headers.authorization = 'Bearer ' + accessToken;
  
//   const query = {
//     method: method,
//     headers: headers
//   }
//   if (method === 'POST') query.body = JSON.stringify(body);

//   return function(dispatch) {
//     dispatch({type: actionType + '_REQUEST'});
//     return request(endpointApi, query)
//     .then(data => {
//       dispatch({
//         type: actionType + '_SUCCESS',
//         payload: data
//       })
//       if (data.accessToken) localStorage.setItem("accessToken", data.accessToken.split('Bearer ')[1]);
//       if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
//     })
//     .catch(err => {
//       dispatch({
//         type: actionType + '_FAILED',
//         payload: err
//       })
//     })
//   }
// }
