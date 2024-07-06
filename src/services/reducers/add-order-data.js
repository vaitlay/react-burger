import { ADD_ORDER_SUCCESS, ADD_ORDER_REQUEST, ADD_ORDER_FAILED } from '../actions/add-order-data.js'

const initialState = {
  orderId: null,
  isLoading: false,
  hasError: false,
  errorMessage: ''
};


const addOrderReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case ADD_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        errorMessage: '',
        orderId: action.payload.number
      };
    }
    case ADD_ORDER_FAILED: {
      return {
         ...state, 
         isLoading: false, 
         hasError: true,
         errorMessage: action.payload,
         orderId: null
        };
    }
    default: {
      return state;
    }
  }
}

export default addOrderReducer;