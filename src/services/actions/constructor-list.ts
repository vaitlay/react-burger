import { generateUniqueId } from '../../utils/generate-id'
import { TIngredientItem, TConstructorItem } from '../../types'

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUNS: 'ADD_BUNS' = 'ADD_BUNS';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = 'CLEAR_INGREDIENTS';

type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT,
  readonly payload: TIngredientItem & {id: string}
}

type TAddBunsAction = {
  readonly type: typeof ADD_BUNS,
  readonly payload: TIngredientItem & {id: string}
}

type TRemoveIngredientAction = {
  readonly type: typeof REMOVE_INGREDIENT,
  readonly payload: string
}

type TMoveIngredientAction = {
  readonly type: typeof MOVE_INGREDIENT,
  readonly payload: {dropIngredient: TConstructorItem,
    dragIngredient: TConstructorItem
  }
}

type TClearIngredientAction = {
  readonly type: typeof CLEAR_INGREDIENTS
}

export const addIngredient = (item: TIngredientItem): TAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...item,
      id: generateUniqueId() 
    }
  }
}
export const addBuns = (item: TIngredientItem): TAddBunsAction => {
    return {
      type: ADD_BUNS,
      payload: {
        ...item,
        id: generateUniqueId() 
      }
    }
  }


  export type TConstructorListActions = TAddIngredientAction 
    | TAddBunsAction 
    | TRemoveIngredientAction 
    | TMoveIngredientAction 
    | TClearIngredientAction;