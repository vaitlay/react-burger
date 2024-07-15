import { LOAD_INGREDIENTS_DATA_SUCCESS, LOAD_INGREDIENTS_DATA_REQUEST, LOAD_INGREDIENTS_DATA_FAILED} from '../actions/load-ingredients-data.js'

const initialState = {
  ingredientsData: [],
  isLoading: false,
  hasError: false,
  errorMessage: ''
};


const loadIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_INGREDIENTS_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOAD_INGREDIENTS_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        errorMessage: '',
        ingredientsData: action.payload
      };
    }
    case LOAD_INGREDIENTS_DATA_FAILED: {
      return {
         ...state, 
         isLoading: false, 
         hasError: true,
         errorMessage: action.payload,
         ingredientsData: []
        };
    }
    default: {
      return state;
    }
  }
}

export default loadIngredientsReducer;