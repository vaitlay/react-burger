import { ADD_BUNS, REMOVE_INGREDIENT, MOVE_INGREDIENT, ADD_INGREDIENT, CLEAR_INGREDIENTS } from '../actions/constructor-list'
import { TConstructorItem } from '../../types'
import { TConstructorListActions } from '../actions/constructor-list'

type TConstructorListState = {
  buns: Array<TConstructorItem>,
  ingredients: Array<TConstructorItem>
}

const initialState: TConstructorListState = {
  buns: [
    {bunLocation: 'top', name : 'Выберите булки', price : 0, id: 'defaultTopBunId', _id: ''},
    {bunLocation: 'bottom', name : 'Выберите булки', price : 0, id: 'defaultBottomBunId',  _id: ''}        
  ],
  ingredients: [
    {name : 'Выберите начинку', id: 'defaultIngredientId', price : 0,  _id: ''}
  ]
};


const constructorListReducer = (state = initialState, action: TConstructorListActions): TConstructorListState => {
  switch(action.type) {
    case ADD_BUNS: {
      return {
        ...state,
        buns: [{...action.payload, bunLocation: 'top'}, 
               {...action.payload, bunLocation: 'bottom'}]
      };
    }
    case ADD_INGREDIENT: {  
      return {
          ...state,
          ingredients: [...state.ingredients.filter(ingr => ingr.name !== 'Выберите начинку'), 
            {...action.payload}]
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.length > 1 
          ? state.ingredients.filter(ingr => ingr.id !== action.payload) 
          : [{name : 'Выберите начинку', id: 'defaultIngredientId', price : 0, _id: '' }]
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
    case CLEAR_INGREDIENTS: {
      return initialState;
    }           
    default: {
      return state;
    }
  }
}

export default constructorListReducer;