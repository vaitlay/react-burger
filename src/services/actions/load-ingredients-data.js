import { loadData } from '../../utils/load-data.js' 

export const LOAD_INGREDIENTS_DATA_SUCCESS = 'LOAD_INGREDIENTS_DATA_SUCCESS';
export const LOAD_INGREDIENTS_DATA_REQUEST = 'LOAD_INGREDIENTS_DATA_REQUEST';
export const LOAD_INGREDIENTS_DATA_FAILED = 'LOAD_INGREDIENTS_DATA_FAILED';

export function loadIngredientsData(ingredientsUrl) {
  return function(dispatch) {
    dispatch({
      type: LOAD_INGREDIENTS_DATA_REQUEST
    });
      
    loadData(ingredientsUrl).then(data => {
      dispatch({
        type: LOAD_INGREDIENTS_DATA_SUCCESS,
        payload: data
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
