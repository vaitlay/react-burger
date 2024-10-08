import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import store from './services/store'
import { TLoadIngredientsDataActions } from './services/actions/load-ingredients-data';
import { TAuthActions } from './services/actions/auth'; 
import { TConstructorListActions } from './services/actions/constructor-list';
import { TIngredientModalActions } from './services/actions/ingredient-modal';
import { TAddOrderDataActions } from './services/actions/order-data';
import { TAllOrdersActions, TWSAllOrdersActions } from './services/actions/all-orders';
import { TUserOrdersActions, TWSUserOrdersActions } from './services/actions/user-orders';

export type TApplicationActions = TLoadIngredientsDataActions |
  TAuthActions | 
  TConstructorListActions | 
  TIngredientModalActions | 
  TAddOrderDataActions |
  TAllOrdersActions |
  TUserOrdersActions;

export type TWSStoreActions = TWSAllOrdersActions | TWSUserOrdersActions;

export type RootState = ReturnType<typeof store.getState>; 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch; 


export type TConstructorItem = {
  id: string;
  readonly _id: string;
  bunLocation?: 'top' | 'bottom';
  name: string;
  price: number;
  image_mobile?: string;
};

export type TIngredientItem = {
  readonly _id: string;
  id?: string,
  name: string,
  type: string,
  proteins?: number,
  fat?: number,
  carbohydrates?: number,
  calories?: number,
  readonly price: number,
  image?: string,
  image_mobile?: string,
  image_large?: string,
  readonly __v?: number
};

export type TAddOrderData = Array<string>

export type TCurrentOrder = {
  name: string,
  order: {
    number: number
  },
  success: boolean
}

export type TOrder = {
  ingredients: Array<string>,
  _id: string,
  status: string,
  number: number,
  name: string,
  updatedAt: string,
  createdAt: string
}

export type TOrderList = {
  success: boolean,
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export type TPrice = {
    size?: 'large' | 'medium' | 'small' | 'default';
    iconType?: 'primary' | 'secondary' | 'error' | 'success';
    value: string | number;
  };

type TError = {
  forgotPassword: boolean;
  resetPassword: boolean;
  register: boolean;
  login: boolean;
  getUserData: boolean;
  pathcUserData: boolean;
}

export type TUser = {
  email: string;
  password?: string;
  name?: string;
}

export type TAuth = {
  isLoading: boolean;
  resetPasswordSuccess: boolean;
  loggedIn: boolean;
  authChecked: boolean;
  hasError: TError;
  errorMessage: string;
  user: TUser;
}

export type TAuthSuccessResponse = {
  success: boolean,
  message: string
}

export type TAuthSuccessLoginResponse = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: Omit<TUser, 'password'>
}

export type TAuthSuccessUserResponse = {
  success: boolean,
  user: Omit<TUser, 'password'>
}

  
