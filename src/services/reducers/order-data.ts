import { 
  ADD_ORDER_SUCCESS, 
  ADD_ORDER_REQUEST, 
  ADD_ORDER_FAILED, 
  GET_ORDER_DATA_SUCCESS,
  GET_ORDER_DATA_REQUEST,
  GET_ORDER_DATA_FAILED,
  TAddOrderDataActions } from '../actions/order-data'
import { TOrder } from '../../types'


type TOrderDataState = {
  addedOrder: number | null,
  loadedOrder: TOrder | undefined,
  isLoading: Boolean,
  hasError: Boolean,
  errorMessage: string
}



export const initialState: TOrderDataState = {
  addedOrder: null,
  loadedOrder: undefined,
  isLoading: false,
  hasError: false,
  errorMessage: ''
};


export const orderReducer = (state = initialState, action: TAddOrderDataActions ): TOrderDataState  => {
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
        addedOrder: action.payload
      };
    }
    case ADD_ORDER_FAILED: {
      return {
         ...state, 
         isLoading: false, 
         hasError: true,
         errorMessage: action.payload,
         addedOrder: null
        };
    }
    case GET_ORDER_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ORDER_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        errorMessage: '',
        loadedOrder: action.payload
      };
    }
    case GET_ORDER_DATA_FAILED: {
      return {
         ...state, 
         isLoading: false, 
         hasError: true,
         errorMessage: action.payload,
         loadedOrder: undefined
        };
    }
    default: {
      return state;
    }
  }
}
