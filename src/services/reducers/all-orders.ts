import {
    ALL_ORDERS_WS_CONNECTION_START,
    ALL_ORDERS_WS_CONNECTION_SUCCESS,
    ALL_ORDERS_WS_CONNECTION_ERROR,
    ALL_ORDERS_WS_CONNECTION_CLOSED,
    ALL_ORDERS_WS_GET_MESSAGE
  } from '../actions/all-orders';

import type { TAllOrdersActions } from '../actions/all-orders'
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
  
export const wsAllOrdersReducer = (state = initialState, action: TAllOrdersActions) => {
    switch (action.type) {
      case ALL_ORDERS_WS_CONNECTION_START:
        return {
          ...state,
          error: '',
          wsConnected: false
        }
      case ALL_ORDERS_WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: '',
          wsConnected: true
        };
  
      case ALL_ORDERS_WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };
  
      case ALL_ORDERS_WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: '',
          wsConnected: false
        };
  
      case ALL_ORDERS_WS_GET_MESSAGE:
        return {
          ...state,
          error: '',
          messages: action.payload
        };
  
      default:
        return state;
    }
  };








