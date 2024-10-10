import { LOAD_INGREDIENTS_DATA_SUCCESS, LOAD_INGREDIENTS_DATA_REQUEST, LOAD_INGREDIENTS_DATA_FAILED } from '../actions/load-ingredients-data'
import { initialState, loadIngredientsReducer } from './load-ingredients-data'



describe('load-ingredient-data Reducer', () => {
  it("should return the initial state", () => {
    expect(loadIngredientsReducer(undefined, {}))
      .toEqual(initialState);
  });

  it("should handle LOAD_INGREDIENTS_DATA_REQUEST", () => {

    expect(
        loadIngredientsReducer(initialState, { 
        type: LOAD_INGREDIENTS_DATA_REQUEST
      })
    ).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle LOAD_INGREDIENTS_DATA_FAILED", () => {
    expect(
        loadIngredientsReducer(initialState, { 
        type: LOAD_INGREDIENTS_DATA_FAILED,
        payload: 'Error'
      })
    ).toEqual({ ...initialState,       
      isLoading: false, 
      hasError: true,
      errorMessage: 'Error',
      ingredientsData: [] 
    })
  });

  it("should handle LOAD_INGREDIENTS_DATA_SUCCESS", () => {
    expect(
        loadIngredientsReducer(initialState, { 
        type: LOAD_INGREDIENTS_DATA_SUCCESS,
        payload: [{_id: '1'},{_id: '2'},{_id: '3'}]
      })
    ).toEqual({ ...initialState,       
      isLoading: false,
      hasError: false,
      errorMessage: '',
      ingredientsData: [{_id: '1'},{_id: '2'},{_id: '3'}]
    })
  });  

});