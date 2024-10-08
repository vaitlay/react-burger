import {
    USER_ORDERS_WS_CONNECTION_START,
    USER_ORDERS_WS_CONNECTION_SUCCESS,
    USER_ORDERS_WS_CONNECTION_ERROR,
    USER_ORDERS_WS_CONNECTION_CLOSED,
    USER_ORDERS_WS_GET_MESSAGE
  } from '../actions/user-orders';

import { initialState, wsUserOrdersReducer } from './user-orders'

describe('all Orders Reducer', () => {

  const testOrderList = [{
    ingredients: ['I1','I2'],
    _id: 'O1',
    status: 'done',
    number: 1234,
    name: 'OrderName',
    updatedAt: '01.10.24',
    createdAt:  '01.10.24'
  },
  {
    ingredients: ['I1','I2'],
    _id: 'O2',
    status: 'done',
    number: 1235,
    name: 'OrderName2',
    updatedAt: '01.10.24',
    createdAt:  '01.10.24'
  }];  

  it("should return the initial state", () => {
    expect(wsUserOrdersReducer(undefined, {}))
      .toEqual(initialState);
  });

  it("should handle USER_ORDERS_WS_CONNECTION_START", () => {
    expect(
      wsUserOrdersReducer(initialState, { type: USER_ORDERS_WS_CONNECTION_START }))
        .toEqual({ ...initialState, error: '', wsConnected: false });
  });

  it("should handle USER_ORDERS_WS_CONNECTION_SUCCESS", () => {
    expect(
      wsUserOrdersReducer(initialState, { type: USER_ORDERS_WS_CONNECTION_SUCCESS }))
        .toEqual({ ...initialState, error: '', wsConnected: true });
  });    

  it("should handle USER_ORDERS_WS_CONNECTION_ERROR", () => {
    expect(
      wsUserOrdersReducer(initialState, { type: USER_ORDERS_WS_CONNECTION_ERROR, payload: 'Error' }))
        .toEqual({ ...initialState, error: 'Error', wsConnected: false });
  });  

  it("should handle USER_ORDERS_WS_CONNECTION_CLOSED", () => {
    expect(
      wsUserOrdersReducer(initialState, { type: USER_ORDERS_WS_CONNECTION_CLOSED }))
        .toEqual({ ...initialState, error: '', wsConnected: false });
  });  
  
  it("should handle USER_ORDERS_WS_GET_MESSAGE", () => {
    expect(
      wsUserOrdersReducer(initialState, { type: USER_ORDERS_WS_GET_MESSAGE, payload: testOrderList }))
        .toEqual({ ...initialState, error: '', messages: testOrderList });
  });   
  

});