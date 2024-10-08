import { loadIngredientsDataRequest } from '../../utils/api'
import { TIngredientItem, AppDispatch } from '../../types'

export const LOAD_INGREDIENTS_DATA_SUCCESS: 'LOAD_INGREDIENTS_DATA_SUCCESS' = 'LOAD_INGREDIENTS_DATA_SUCCESS';
export const LOAD_INGREDIENTS_DATA_REQUEST: 'LOAD_INGREDIENTS_DATA_REQUEST' = 'LOAD_INGREDIENTS_DATA_REQUEST';
export const LOAD_INGREDIENTS_DATA_FAILED: 'LOAD_INGREDIENTS_DATA_FAILED' = 'LOAD_INGREDIENTS_DATA_FAILED';

export type TLoadIngredientsDataSuccessAction = {
  readonly type: typeof LOAD_INGREDIENTS_DATA_SUCCESS,
  readonly payload: Array<TIngredientItem>
}
export type TLoadIngredientsDataRequestAction = {
  readonly type: typeof LOAD_INGREDIENTS_DATA_REQUEST
}
export type TLoadIngredientsDataFailedAction = {
  readonly type: typeof LOAD_INGREDIENTS_DATA_FAILED,
  readonly payload: string
}

export function loadIngredientsData() {
  return function(dispatch: AppDispatch): void {
    dispatch({
      type: LOAD_INGREDIENTS_DATA_REQUEST
    }); 
    loadIngredientsDataRequest()
      .then(data => {
        dispatch({
          type: LOAD_INGREDIENTS_DATA_SUCCESS,
          payload: data.data
        })
      })
      .catch(err => {
        dispatch({
          type: LOAD_INGREDIENTS_DATA_FAILED,
          payload: err
        })
      })
  }
}

export type TLoadIngredientsDataActions = TLoadIngredientsDataSuccessAction 
| TLoadIngredientsDataRequestAction 
| TLoadIngredientsDataFailedAction;