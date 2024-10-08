import { TUser } from '../../types'
import {
  FORGOT_PASSWORD_SUCCESS, 
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_FAILED, 
  RESET_PASSWORD_SUCCESS, 
  RESET_PASSWORD_REQUEST, 
  RESET_PASSWORD_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_FAILED,
  PATCH_USER_DATA_SUCCESS,
  PATCH_USER_DATA_REQUEST,
  PATCH_USER_DATA_FAILED,
  SET_AUTH_CHECKED,
  TAuthActions
} from '../actions/auth'


type TAuthState = {
  isLoading: boolean,
  requestSuccess: boolean,
  loggedIn: boolean,
  authChecked: boolean,
  hasError: {
    forgotPassword?: boolean,
    resetPassword?: boolean,
    register?: boolean,
    login?: boolean,
    getUserData?: boolean,
    patchUserData?: boolean
  },
  errorMessage: string,
  user: TUser
}


  const initialState: TAuthState = {
    isLoading: false,
    requestSuccess: false,
    loggedIn: false,
    authChecked: false,
    hasError: {},
    errorMessage: '',
    user: { email: '' }
  };
  
  
  const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
    switch(action.type) {
      case SET_AUTH_CHECKED: {
        return {
          ...state, authChecked: true
        }
      }
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
      case GET_USER_DATA_REQUEST: {
        return {
          ...state,
          isLoading: true,
          requestSuccess: false,
          hasError: {},
          errorMessage: '',
          authChecked: false 
        }
      }
      case FORGOT_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
      case LOGOUT_REQUEST:
      case PATCH_USER_DATA_REQUEST: {
        return {
          ...state,
          isLoading: true,
          requestSuccess: false,
          hasError: {},
          errorMessage: ''   
        };
      }
      case FORGOT_PASSWORD_FAILED:
        return {
          ...state,
          isLoading: false, 
          requestSuccess: false, 
          hasError: {forgotPassword: true},
          errorMessage: action.payload
         };
      case RESET_PASSWORD_FAILED:
        return {
          ...state,
          isLoading: false, 
          requestSuccess: false, 
          hasError: {resetPassword: true},
          errorMessage: action.payload
         };
      case REGISTER_FAILED:
        return {
          ...state,
          isLoading: false, 
          requestSuccess: false, 
          hasError: {register: true},
          errorMessage: action.payload
         };
      case LOGIN_FAILED:
        return {
          ...state,
          isLoading: false, 
          requestSuccess: false, 
          hasError: {login: true},
          errorMessage: action.payload
         };
      case LOGOUT_FAILED:
      case GET_USER_DATA_FAILED:
        return {
          ...state,
          isLoading: false, 
          requestSuccess: false, 
          hasError: {getUserData: true},
          errorMessage: action.payload
         };
      case PATCH_USER_DATA_FAILED: {
        return {
           ...state,
           isLoading: false, 
           requestSuccess: false, 
           hasError: {patchUserData: true},
           errorMessage: action.payload
          };
      }
      case FORGOT_PASSWORD_SUCCESS:
      case LOGOUT_SUCCESS: {
        return {
          ...state,
          requestSuccess: true,
          isLoading: false,
          loggedIn: false,
          hasError: {},
          errorMessage: '',   
          user: { email: '' }
        };
      }
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          requestSuccess: true,
          isLoading: false,
          hasError: {},
          errorMessage: '',   
        }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      case GET_USER_DATA_SUCCESS:
      case PATCH_USER_DATA_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          requestSuccess: true,
          loggedIn: true,
          hasError: {},
          errorMessage: '',   
          user: action.payload.user,
        }
      } 

      default: {
        return state;
      }
    }
  }
  
  export default authReducer;