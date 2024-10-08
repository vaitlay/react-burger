import { ADD_BUNS, REMOVE_INGREDIENT, MOVE_INGREDIENT, ADD_INGREDIENT, CLEAR_INGREDIENTS } from '../actions/constructor-list'
import { initialState, constructorListReducer } from './constructor-list'



describe('constructor-list Reducer', () => {

  const testBun = {
    _id: 'bunRandomId',
    id: 'bunGeneratedRandomId',
    name: 'bunName',
    type: 'bun',
    price: 1234
  };
  const testSauce = {
    _id: 'sauceId',
    id: 'sauceGeneratedRandomId',
    name: 'sauceName',
    type: 'sauce',
    price: 123
  }
  const testMain = {
    _id: 'mainId',
    id: 'mainGeneratedRandomId',
    name: 'mainName',
    type: 'main',
    price: 12345
  }  

  it("should return the initial state", () => {
    expect(constructorListReducer(undefined, {}))
      .toEqual(initialState);
  });

  it("should handle ADD_BUNS", () => {
    expect(
      constructorListReducer(initialState, { 
        type: ADD_BUNS, 
        payload: testBun 
      })
    ).toEqual({ ...initialState, buns: [
        {...testBun, bunLocation: 'top'}, 
        {...testBun, bunLocation: 'bottom'}
      ] 
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      constructorListReducer(initialState, { 
        type: ADD_INGREDIENT,
        payload: testSauce 
      })
    ).toEqual({ ...initialState, ingredients: [
      ...initialState.ingredients.filter(ingr => ingr.name !== 'Выберите начинку'),
      testSauce
      ]  
    });
  });  

  it("should handle REMOVE_INGREDIENT", () => {
    expect(
      constructorListReducer({...initialState, ingredients: [testSauce]}, { 
        type: REMOVE_INGREDIENT,
        payload: 'sauceGeneratedRandomId' 
      })
    ).toEqual({ ...initialState });
  });  

  it("should handle MOVE_INGREDIENT", () => {
    expect(
      constructorListReducer({...initialState, ingredients: [testSauce, testMain]}, { 
        type: MOVE_INGREDIENT,
        payload: { dropIngredient: testMain, dragIngredient: testSauce }
      })
    ).toEqual({ ...initialState, ingredients: [testMain ,testSauce] });
  }); 

  it("should handle CLEAR_INGREDIENTS", () => {
    expect(
      constructorListReducer({...initialState, 
        buns: [testBun, testBun], 
        ingredients: [testSauce, testMain]
      }, { 
        type: CLEAR_INGREDIENTS,
      })
    ).toEqual({ ...initialState});
  });   

});