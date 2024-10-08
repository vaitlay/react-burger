import {
    USER_ORDERS_WS_CONNECTION_START,
    USER_ORDERS_WS_CONNECTION_SUCCESS,
    USER_ORDERS_WS_CONNECTION_ERROR,
    USER_ORDERS_WS_CONNECTION_CLOSED,
    USER_ORDERS_WS_GET_MESSAGE
  } from '../actions/user-orders';

import type { TUserOrdersActions } from '../actions/user-orders';
import type { TOrderList } from '../../types';
  
  type TWSState = {
    wsConnected: boolean;
    messages: TOrderList;
    error?: Event;
  }
  
  export const initialState: TWSState = {
    wsConnected: false,
    messages: {
      success: false,
      orders: [],
      total: 0,
      totalToday: 0
    }
  };
  
export const wsUserOrdersReducer = (state = initialState, action: TUserOrdersActions) => {
    switch (action.type) {
      case USER_ORDERS_WS_CONNECTION_START:
        return {
          ...state,
          error: '',
          wsConnected: false
        }
      case USER_ORDERS_WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: '',
          wsConnected: true
        };
  
      case USER_ORDERS_WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };
  
      case USER_ORDERS_WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: '',
          wsConnected: false
        };
  
      case USER_ORDERS_WS_GET_MESSAGE:
        return {
          ...state,
          error: '',
          messages: action.payload
        };
  
      default:
        return state;
    }
  };







