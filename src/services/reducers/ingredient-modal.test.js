import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/ingredient-modal'
import { initialState, ingredientModalReducer } from './ingredient-modal'



describe('ingredienta-modal Reducer', () => {
  it("should return the initial state", () => {
    expect(ingredientModalReducer(undefined, {}))
      .toEqual(initialState);
  });

  it("should handle SET_CURRENT_INGREDIENT", () => {
    const testItem = {
      _id: 'stringRandomId',
      id: 'stringGeneratedRandomId',
      name: 'IngredientName',
      type: 'bun or sauce or main',
      price: 1234
    };

    expect(
      ingredientModalReducer([], { 
        type: SET_CURRENT_INGREDIENT, 
        payload: testItem 
      })
    ).toEqual({ ...initialState, currentIngredient: testItem });
  });

  it("should handle CLEAR_CURRENT_INGREDIENT", () => {
    expect(
      ingredientModalReducer([], { 
        type: CLEAR_CURRENT_INGREDIENT
      })
    ).toEqual({ ...initialState, currentIngredient: null });
  });

});