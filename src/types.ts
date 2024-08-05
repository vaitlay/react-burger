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
type TUser = {
  email: string;
  password: string;
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
  
