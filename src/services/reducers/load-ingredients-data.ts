import { LOAD_INGREDIENTS_DATA_SUCCESS, LOAD_INGREDIENTS_DATA_REQUEST, LOAD_INGREDIENTS_DATA_FAILED, TLoadIngredientsDataActions } from '../actions/load-ingredients-data'
import { TIngredientItem } from '../../types'

type TIngredientDataState = {
  ingredientsData: Array<TIngredientItem>,
  isLoading: Boolean,
  hasError: Boolean,
  errorMessage: string
}


export const initialState: TIngredientDataState = {
  ingredientsData: [],
  isLoading: false,
  hasError: false,
  errorMessage: ''
};


export const loadIngredientsReducer = (state = initialState, action: TLoadIngredientsDataActions): TIngredientDataState => {
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
