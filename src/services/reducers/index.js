import { combineReducers } from 'redux';
import  loadIngredientsReducer  from './load-ingredients-data.js'
import  ingredientModalReducer  from './ingredient-modal.js'  
import  constructorListReducer  from './constructor-list.js'  
import  addOrderReducer  from './add-order-data.js' 

const rootReducer = combineReducers({
    loadIngredientsReducer,
    ingredientModalReducer,
    constructorListReducer,
    addOrderReducer
}) 

export default rootReducer