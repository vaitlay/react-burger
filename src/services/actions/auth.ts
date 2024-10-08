import { 
  forgotPasswordRequest,
  resetPasswordRequest,
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserDataRequest,
  patchUserDataRequest
} from '../../utils/api'

import { AppDispatch, TUser, TAuthSuccessResponse, TAuthSuccessLoginResponse, TAuthSuccessUserResponse } from '../../types'

export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST'
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED'

export const PATCH_USER_DATA_SUCCESS: 'POST_USER_DATA_SUCCESS' = 'POST_USER_DATA_SUCCESS'
export const PATCH_USER_DATA_REQUEST: 'POST_USER_DATA_REQUEST' = 'POST_USER_DATA_REQUEST'
export const PATCH_USER_DATA_FAILED: 'POST_USER_DATA_FAILED' = 'POST_USER_DATA_FAILED'

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';

export type TForgotPasswordSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS,
  readonly payload: TAuthSuccessResponse
}
export type TForgotPasswordRequestAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}
export type TForgotPasswordFailedAction = {
  readonly type: typeof FORGOT_PASSWORD_FAILED,
  readonly payload: string
}
export type TResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS,
  readonly payload: TAuthSuccessResponse
}
export type TResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST
}
export type TResetPasswordFailedAction = {
  readonly type: typeof RESET_PASSWORD_FAILED,
  readonly payload: string
}
export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS,
  readonly payload: TAuthSuccessLoginResponse
}
export type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST
}
export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED,
  readonly payload: string
}
export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS,
  readonly payload: TAuthSuccessLoginResponse
}
export type TRegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST
}
export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED,
  readonly payload: string
}
export type TLogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS,
  readonly payload: TAuthSuccessResponse
}
export type TLogoutRequestAction = {
  readonly type: typeof LOGOUT_REQUEST
}
export type TLogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED,
  readonly payload: string
}
export type TGetUserDataSuccessAction = {
  readonly type: typeof GET_USER_DATA_SUCCESS,
  readonly payload: TAuthSuccessUserResponse
}
export type TGetUserDataRequestAction = {
  readonly type: typeof GET_USER_DATA_REQUEST
}
export type TGetUserDataFailedAction = {
  readonly type: typeof GET_USER_DATA_FAILED,
  readonly payload: string
}
export type TPatchUserDataSuccessAction = {
  readonly type: typeof PATCH_USER_DATA_SUCCESS,
  readonly payload: TAuthSuccessUserResponse
}
export type TPatchUserDataRequestAction = {
  readonly type: typeof PATCH_USER_DATA_REQUEST
}
export type TPatchUserDataFailedAction = {
  readonly type: typeof PATCH_USER_DATA_FAILED,
  readonly payload: string
}
export type TSetAuthChekedAction = {
  readonly type: typeof SET_AUTH_CHECKED
}

export const forgotPassword = ({ email }: { email: string }) => {
  return function(dispatch: AppDispatch): void {
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

export const resetPassword = ({ newPassword, token }: { newPassword: string, token: string}) => {
  return function(dispatch: AppDispatch): void {
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

export const login = ({ email, password }: { email: string, password: string}) => {
  return function(dispatch: AppDispatch) {
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

export const register = ({ email, password, name }: { email: string, password: string, name: string }) => {
  return function(dispatch: AppDispatch): void {
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
  return function(dispatch: AppDispatch) {
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
  return function(dispatch: AppDispatch) {
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

export const patchUserData = (user: TUser) => {
  return function(dispatch: AppDispatch) {
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


export type TAuthActions = TForgotPasswordSuccessAction |
  TForgotPasswordRequestAction |
  TForgotPasswordFailedAction |
  TResetPasswordSuccessAction |
  TResetPasswordRequestAction | 
  TResetPasswordFailedAction |
  TLoginSuccessAction |
  TLoginRequestAction |
  TLoginFailedAction |
  TRegisterSuccessAction |
  TRegisterRequestAction | 
  TRegisterFailedAction |
  TLogoutSuccessAction |
  TLogoutRequestAction |
  TLogoutFailedAction |
  TGetUserDataSuccessAction |
  TGetUserDataRequestAction | 
  TGetUserDataFailedAction |
  TPatchUserDataSuccessAction |
  TPatchUserDataRequestAction | 
  TPatchUserDataFailedAction | 
  TSetAuthChekedAction;



