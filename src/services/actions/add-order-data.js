import { addOrder } from '../../utils/add-order.js';

export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';

export function addCurrentOrder(orderUrl, data) {
  return function(dispatch) {
    dispatch({ type: ADD_ORDER_REQUEST });
    addOrder(orderUrl, data)
      .then(data => {
        dispatch({ type: ADD_ORDER_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: ADD_ORDER_FAILED, payload: err });
      });
  }
}

