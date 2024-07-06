import { ADD_BUNS, ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../actions/constructor-list.js'
import { generateUniqueId } from '../../utils/generate-id.js'

const initialState = {
  buns: [
    {bunLocation: 'top', name : 'Выберите булки', price : '0', id: generateUniqueId()},
    {bunLocation: 'bottom', name : 'Выберите булки', price : '0', id: generateUniqueId()}        
  ],
  ingredients: [
    {name : 'Выберите начинку', id: generateUniqueId(), price : '0'}
  ]
};


const constructorListReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_BUNS: {
      return {
        ...state,
        buns: [{...action.payload, bunLocation: 'top', id: generateUniqueId()}, 
               {...action.payload, bunLocation: 'bottom', id: generateUniqueId()}]
      };
    }
    case ADD_INGREDIENT: {  
      return {
          ...state,
          ingredients: [...state.ingredients.filter(ingr => ingr.name !== 'Выберите начинку'), {...action.payload, id: generateUniqueId()}]
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.length > 1 
          ? state.ingredients.filter(ingr => ingr.id !== action.payload) 
          : [{name : 'Выберите начинку', id: generateUniqueId(), price : '0'}]
      };
    } 
    case MOVE_INGREDIENT: {
      const dragIndex = state.ingredients.findIndex(ingr => ingr.id === action.payload.dragIngredient.id)
      const dropIndex = state.ingredients.findIndex(ingr => ingr.id === action.payload.dropIngredient.id)
      const sortedIngredient = [...state.ingredients];
      sortedIngredient.splice(dropIndex <= dragIndex ? dropIndex : dropIndex + 1,0,action.payload.dragIngredient)
      sortedIngredient.splice(dragIndex <= dropIndex ? dragIndex : dragIndex + 1,1)
      return {
        ...state,
        ingredients: sortedIngredient
      };
    }            
    default: {
      return state;
    }
  }
}

export default constructorListReducer;