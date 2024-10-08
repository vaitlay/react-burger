import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT, TIngredientModalActions } from '../actions/ingredient-modal'
import { TIngredientItem } from '../../types';

type TIngredientModal = {
  currentIngredient: TIngredientItem | null
}

export const initialState: TIngredientModal = {
  currentIngredient: null
};


export const ingredientModalReducer = (state = initialState, action: TIngredientModalActions): TIngredientModal => {
  switch(action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload
      };
    }
    case CLEAR_CURRENT_INGREDIENT: {
        return {
          ...state,
          currentIngredient: null
        };
      }
    default: {
      return state;
    }
  }
}
