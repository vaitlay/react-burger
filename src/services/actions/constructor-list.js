import { generateUniqueId } from '../../utils/generate-id.js'

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUNS = 'ADD_BUNS';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';
export const addIngredient = (item) => {
  return {
    type: ADD_INGREDIENT,
      payload: {
        ...item,
        id: generateUniqueId() 
      }
    }
}
export const addBuns = (item) => {
    return {
      type: ADD_BUNS,
        payload: {
          ...item,
          id: generateUniqueId() 
        }
      }
  }
