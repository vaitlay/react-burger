import {
    ALL_ORDERS_WS_CONNECTION_START,
    ALL_ORDERS_WS_CONNECTION_SUCCESS,
    ALL_ORDERS_WS_CONNECTION_ERROR,
    ALL_ORDERS_WS_CONNECTION_CLOSED,
    ALL_ORDERS_WS_GET_MESSAGE
  } from '../actions/all-orders';

import { initialState, wsAllOrdersReducer } from './all-orders'

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
    expect(wsAllOrdersReducer(undefined, {}))
      .toEqual(initialState);
  });

  it("should handle ALL_ORDERS_WS_CONNECTION_START", () => {
    expect(
      wsAllOrdersReducer(initialState, { type: ALL_ORDERS_WS_CONNECTION_START }))
        .toEqual({ ...initialState, error: '', wsConnected: false });
  });

  it("should handle ALL_ORDERS_WS_CONNECTION_SUCCESS", () => {
    expect(
      wsAllOrdersReducer(initialState, { type: ALL_ORDERS_WS_CONNECTION_SUCCESS }))
        .toEqual({ ...initialState, error: '', wsConnected: true });
  });    

  it("should handle ALL_ORDERS_WS_CONNECTION_ERROR", () => {
    expect(
      wsAllOrdersReducer(initialState, { type: ALL_ORDERS_WS_CONNECTION_ERROR, payload: 'Error' }))
        .toEqual({ ...initialState, error: 'Error', wsConnected: false });
  });  

  it("should handle ALL_ORDERS_WS_CONNECTION_CLOSED", () => {
    expect(
      wsAllOrdersReducer(initialState, { type: ALL_ORDERS_WS_CONNECTION_CLOSED }))
        .toEqual({ ...initialState, error: '', wsConnected: false });
  });  
  
  it("should handle ALL_ORDERS_WS_GET_MESSAGE", () => {
    expect(
      wsAllOrdersReducer(initialState, { type: ALL_ORDERS_WS_GET_MESSAGE, payload: testOrderList }))
        .toEqual({ ...initialState, error: '', messages: testOrderList });
  });   
  

});