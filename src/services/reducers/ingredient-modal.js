import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/ingredient-modal.js'

const initialState = {
  currentIngredient: {}
};


const ingredientModalReducer = (state = initialState, action) => {
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
          currentIngredient: {}
        };
      }
    default: {
      return state;
    }
  }
}

export default ingredientModalReducer;