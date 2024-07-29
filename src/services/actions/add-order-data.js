import { addCurrentOrderRequest } from '../../utils/api.js'
import { CLEAR_INGREDIENTS } from './constructor-list.js'

export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';

export function addCurrentOrder(orderData) {
  return function(dispatch) {
    dispatch({ type: ADD_ORDER_REQUEST });
    addCurrentOrderRequest(orderData)
      .then(data => {
        dispatch({ type: ADD_ORDER_SUCCESS, payload: data });
        dispatch({ type : CLEAR_INGREDIENTS });
      })
      .catch(err => {
        dispatch({ type: ADD_ORDER_FAILED, payload: err.message });
      });
  }
}
