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
    SET_AUTH_CHECKED
  } from '../actions/auth'

import { initialState, authReducer } from './auth'



describe('auth Reducer', () => {
      
  const testUser = {
    email: 'testEmail@email.ru',
    name: 'admin'
  }

  const AuthSucessResponse = {
    success: true,
    user: testUser,
  }

  const requestState = { 
    ...initialState,           
    isLoading: true,
    requestSuccess: false,
    hasError: {},
    errorMessage: ''
  }

  const failedState = (action) => {
    const returnState = { 
      ...initialState,           
      isLoading: false,
      requestSuccess: false,
      hasError: {},
      errorMessage: 'Error'
    }
    returnState.hasError[action] = true;
    return returnState
  }  

  const successState = (action) => {
    const returnState = {
      ...initialState,
      isLoading: false,
      requestSuccess: true,
      hasError: {},
      errorMessage: ''
    }
    if (action !== LOGOUT_SUCCESS && action !== FORGOT_PASSWORD_SUCCESS && action !== RESET_PASSWORD_SUCCESS) {
      returnState.loggedIn = true;
      returnState.user = testUser;
    }
    return returnState;
  }

  it("should return the initial state", () => {
    expect(authReducer(undefined, {}))
      .toEqual(initialState);
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(authReducer(initialState, { type: FORGOT_PASSWORD_REQUEST }))
      .toEqual(requestState);
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(authReducer(initialState, { type: RESET_PASSWORD_REQUEST }))
      .toEqual(requestState);
  });  

  it("should handle REGISTER_REQUEST", () => {
    expect(authReducer(initialState, { type: REGISTER_REQUEST }))
      .toEqual(requestState);
  });    

  it("should handle LOGIN_REQUEST", () => {
    expect(authReducer(initialState, { type: LOGIN_REQUEST }))
      .toEqual(requestState);
  });   
  
  it("should handle LOGOUT_REQUEST", () => {
    expect(authReducer(initialState, { type: LOGOUT_REQUEST }))
      .toEqual(requestState);
  }); 

  it("should handle GET_USER_DATA_REQUEST", () => {
    expect(authReducer(initialState, { type: GET_USER_DATA_REQUEST }))
      .toEqual(requestState);
  }); 
  
  it("should handle PATCH_USER_DATA_REQUEST", () => {
    expect(authReducer(initialState, { type: PATCH_USER_DATA_REQUEST }))
      .toEqual(requestState);
  });   

  it("should handle FORGOT_PASSWORD_FAILED", () => {
    expect(authReducer(initialState, { type: FORGOT_PASSWORD_FAILED, payload: 'Error'  }))
      .toEqual(failedState('forgotPassword'));
  });  

  it("should handle RESET_PASSWORD_FAILED", () => {
    expect(authReducer(initialState, { type: RESET_PASSWORD_FAILED, payload: 'Error'  }))
      .toEqual(failedState('resetPassword'));
  });  

  it("should handle REGISTER_FAILED", () => {
    expect(authReducer(initialState, { type: REGISTER_FAILED, payload: 'Error'  }))
      .toEqual(failedState('register'));
  });  

  it("should handle LOGIN_FAILED", () => {
    expect(authReducer(initialState, { type: LOGIN_FAILED, payload: 'Error'  }))
      .toEqual(failedState('login'));
  });  

  it("should handle LOGOUT_FAILED", () => {
    expect(authReducer(initialState, { type: LOGOUT_FAILED, payload: 'Error'  }))
      .toEqual(failedState('getUserData'));
  });  

  it("should handle GET_USER_DATA_FAILED", () => {
    expect(authReducer(initialState, { type: GET_USER_DATA_FAILED, payload: 'Error'  }))
      .toEqual(failedState('getUserData'));
  });  

  it("should handle PATCH_USER_DATA_FAILED", () => {
    expect(authReducer(initialState, { type: PATCH_USER_DATA_FAILED, payload: 'Error'  }))
      .toEqual(failedState('patchUserData'));
  });  
  
  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(authReducer(initialState, { type: FORGOT_PASSWORD_SUCCESS }))
      .toEqual(successState(FORGOT_PASSWORD_SUCCESS));
  });  

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(authReducer(initialState, { type: RESET_PASSWORD_SUCCESS }))
      .toEqual(successState(RESET_PASSWORD_SUCCESS));
  });  

  it("should handle REGISTER_SUCCESS", () => {
    expect(authReducer(initialState, { type: REGISTER_SUCCESS, payload: AuthSucessResponse }))
      .toEqual(successState(REGISTER_SUCCESS));
  });  

  it("should handle LOGIN_SUCCESS", () => {
    expect(authReducer(initialState, { type: LOGIN_SUCCESS, payload: AuthSucessResponse  }))
      .toEqual(successState(LOGIN_SUCCESS));
  });  

  it("should handle LOGOUT_SUCCESS", () => {
    expect(authReducer(initialState, { type: LOGOUT_SUCCESS }))
      .toEqual(successState(LOGOUT_SUCCESS));
  });   

  it("should handle GET_USER_DATA_SUCCESS", () => {
    expect(authReducer(initialState, { type: GET_USER_DATA_SUCCESS, payload: AuthSucessResponse }))
      .toEqual(successState(GET_USER_DATA_SUCCESS));
  });  

  it("should handle PATCH_USER_DATA_SUCCESS", () => {
    expect(authReducer(initialState, { type: PATCH_USER_DATA_SUCCESS, payload: AuthSucessResponse }))
      .toEqual(successState(PATCH_USER_DATA_SUCCESS));
  });   

  it("should handle SET_AUTH_CHECKED", () => {
    expect(authReducer(initialState, { type: SET_AUTH_CHECKED }))
      .toEqual({...initialState, authChecked: true});
  });   


});