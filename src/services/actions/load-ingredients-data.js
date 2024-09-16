import { loadIngredientsDataRequest } from '../../utils/api'

export const LOAD_INGREDIENTS_DATA_SUCCESS = 'LOAD_INGREDIENTS_DATA_SUCCESS';
export const LOAD_INGREDIENTS_DATA_REQUEST = 'LOAD_INGREDIENTS_DATA_REQUEST';
export const LOAD_INGREDIENTS_DATA_FAILED = 'LOAD_INGREDIENTS_DATA_FAILED';

export function loadIngredientsData() {
  return function(dispatch) {
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
