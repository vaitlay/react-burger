import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket';
import { wsAllOrdersActions } from './actions/all-orders';
import { wsUserOrdersActions } from './actions/user-orders';
import rootReducer from './reducers/index'


const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(socketMiddleware(wsAllOrdersActions), socketMiddleware(wsUserOrdersActions))
});

export default store;