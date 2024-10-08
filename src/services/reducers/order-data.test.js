import { 
    ADD_ORDER_SUCCESS, 
    ADD_ORDER_REQUEST, 
    ADD_ORDER_FAILED, 
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_REQUEST,
    GET_ORDER_DATA_FAILED } from '../actions/order-data'

import { initialState, orderReducer } from './order-data'



describe('order-data Reducer', () => {

  const testOrder = {
    ingredients: ['I1','I2'],
    _id: 'O1',
    status: 'done',
    number: 1234,
    name: 'OrderName',
    updatedAt: '01.10.24',
    createdAt:  '01.10.24'
  }

  it("should return the initial state", () => {
    expect(orderReducer(undefined, {}))
      .toEqual(initialState);
  });

  it("should handle ADD_ORDER_REQUEST", () => {
    expect(
      orderReducer(initialState, { 
        type: ADD_ORDER_REQUEST
      })
    ).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle ADD_ORDER_FAILED", () => {
    expect(
      orderReducer(initialState, { 
        type: ADD_ORDER_FAILED,
        payload: 'Error'
      })
    ).toEqual({ ...initialState,       
      isLoading: false, 
      hasError: true,
      errorMessage: 'Error',
      addedOrder: null 
    })
  });

  it("should handle ADD_ORDER_SUCCESS", () => {
    expect(
      orderReducer(initialState, { 
        type: ADD_ORDER_SUCCESS,
        payload: 1234
      })
    ).toEqual({ ...initialState,       
      isLoading: false,
      hasError: false,
      errorMessage: '',
      addedOrder: 1234
    })
  });

  it("should handle GET_ORDER_DATA_REQUEST", () => {
    expect(
      orderReducer(initialState, { 
        type: GET_ORDER_DATA_REQUEST
      })
    ).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle GET_ORDER_DATA_FAILED", () => {
    expect(
      orderReducer(initialState, { 
        type: GET_ORDER_DATA_FAILED,
        payload: 'Error'
      })
    ).toEqual({ ...initialState,       
      isLoading: false, 
      hasError: true,
      errorMessage: 'Error',
      loadedOrder: undefined
    })
  });  

  it("should handle GET_ORDER_DATA_SUCCESS", () => {
    expect(
      orderReducer(initialState, { 
        type: GET_ORDER_DATA_SUCCESS,
        payload: testOrder
      })
    ).toEqual({ ...initialState,       
      isLoading: false,
      hasError: false,
      errorMessage: '',
      loadedOrder: testOrder
    })
  });  

});