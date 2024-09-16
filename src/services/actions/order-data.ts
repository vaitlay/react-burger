import { addCurrentOrderRequest, getCurrentOrderRequest} from '../../utils/api'
import { CLEAR_INGREDIENTS } from './constructor-list'
import { AppDispatch, TAddOrderData, TOrder } from '../../types'

export const ADD_ORDER_SUCCESS: 'ADD_ORDER_SUCCESS' = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_REQUEST: 'ADD_ORDER_REQUEST' = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_FAILED: 'ADD_ORDER_FAILED' = 'ADD_ORDER_FAILED';
export const GET_ORDER_DATA_REQUEST: 'GET_ORDER_DATA_REQUEST' = 'GET_ORDER_DATA_REQUEST';
export const GET_ORDER_DATA_SUCCESS: 'GET_ORDER_DATA_SUCCESS' = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED: 'GET_ORDER_DATA_FAILED' = 'GET_ORDER_DATA_FAILED';

export type TAddOrderSuccessAction = {
  readonly type: typeof ADD_ORDER_SUCCESS,
  readonly payload: number
}

export type TAddOrderRequestAction = {
  readonly type: typeof ADD_ORDER_REQUEST
}

export type TAddOrderFailedAction = {
  readonly type: typeof ADD_ORDER_FAILED,
  readonly payload: string
}

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_DATA_SUCCESS,
  readonly payload: TOrder
}

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_DATA_REQUEST
}

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_DATA_FAILED,
  readonly payload: string
}

export function addCurrentOrder(orderData: TAddOrderData) {
  return function(dispatch: AppDispatch): void {
    dispatch({ type: ADD_ORDER_REQUEST });
    addCurrentOrderRequest(orderData)
      .then(data => {
        dispatch({ type: ADD_ORDER_SUCCESS, payload: data.order.number });
        dispatch({ type : CLEAR_INGREDIENTS });
      })
      .catch(err => {
        dispatch({ type: ADD_ORDER_FAILED, payload: err.message });
      });
  }
}

export function getCurrentOrder(orderNumber: number) {
  return function(dispatch: AppDispatch): void {
      dispatch({ type: GET_ORDER_DATA_REQUEST });
      getCurrentOrderRequest(orderNumber)
        .then(data => {
          dispatch({ type: GET_ORDER_DATA_SUCCESS, payload: data.orders[0] });
        })
        .catch(err => {
          dispatch({ type: GET_ORDER_DATA_FAILED, payload: err.message });
        });
    }
  }

export type TAddOrderDataActions = TAddOrderSuccessAction 
| TAddOrderRequestAction 
| TAddOrderFailedAction
| TGetOrderSuccessAction
| TGetOrderRequestAction
| TGetOrderFailedAction;