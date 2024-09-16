import { combineReducers } from 'redux';
import loadIngredientsReducer  from './load-ingredients-data'
import ingredientModalReducer  from './ingredient-modal'  
import constructorListReducer  from './constructor-list'  
import orderReducer  from './order-data' 
import authReducer  from './auth' 
import wsAllOrdersReducer  from './all-orders'
import wsUserOrdersReducer from './user-orders'

const rootReducer = combineReducers({
    loadIngredientsReducer,
    ingredientModalReducer,
    constructorListReducer,
    orderReducer,
    authReducer,
    wsAllOrdersReducer,
    wsUserOrdersReducer
}) 

export default rootReducer