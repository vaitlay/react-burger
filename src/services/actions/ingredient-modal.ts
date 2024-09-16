import { TIngredientItem } from '../../types'
export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT: 'CLEAR_CURRENT_INGREDIENT' = 'CLEAR_CURRENT_INGREDIENT';

export type TSetCurrentIngredientAction = {
  readonly type: typeof SET_CURRENT_INGREDIENT,
  readonly payload: TIngredientItem
}
export type TClearCurrentIngredientAction = {
  readonly type: typeof CLEAR_CURRENT_INGREDIENT
}

export type TIngredientModalActions = TSetCurrentIngredientAction | TClearCurrentIngredientAction;