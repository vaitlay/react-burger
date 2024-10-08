import { TOrderList } from '../../types';

export const USER_ORDERS_WS_CONNECTION_START: 'USER_ORDERS_WS_CONNECTION_START' = 'USER_ORDERS_WS_CONNECTION_START';
export const USER_ORDERS_WS_CONNECTION_SUCCESS: 'USER_ORDERS_WS_CONNECTION_SUCCESS' = 'USER_ORDERS_WS_CONNECTION_SUCCESS';
export const USER_ORDERS_WS_CONNECTION_CLOSED: 'USER_ORDERS_WS_CONNECTION_CLOSED' = 'USER_ORDERS_WS_CONNECTION_CLOSED';
export const USER_ORDERS_WS_CONNECTION_ERROR: 'USER_ORDERS_WS_CONNECTION_ERROR' = 'USER_ORDERS_WS_CONNECTION_ERROR';
export const USER_ORDERS_WS_GET_MESSAGE: 'USER_ORDERS_WS_GET_MESSAGE' = 'USER_ORDERS_WS_GET_MESSAGE';

export type TWSUserOrdersActions = {
    wsInit: typeof  USER_ORDERS_WS_CONNECTION_START,
    onOpen: typeof  USER_ORDERS_WS_CONNECTION_SUCCESS,
    onClose: typeof USER_ORDERS_WS_CONNECTION_CLOSED,
    onError: typeof  USER_ORDERS_WS_CONNECTION_ERROR,
    onMessage: typeof  USER_ORDERS_WS_GET_MESSAGE
  };

export const wsUserOrdersActions: TWSUserOrdersActions = {
    wsInit: USER_ORDERS_WS_CONNECTION_START,
    onOpen: USER_ORDERS_WS_CONNECTION_SUCCESS,
    onClose: USER_ORDERS_WS_CONNECTION_CLOSED,
    onError: USER_ORDERS_WS_CONNECTION_ERROR,
    onMessage: USER_ORDERS_WS_GET_MESSAGE
}  


export type TUserOrdersWsConnectionStartAction = {
    readonly type: typeof USER_ORDERS_WS_CONNECTION_START;
    readonly payload: {url: string, sendToken : boolean};
}

export type TUserOrdersWsConnectionSuccessAction = {
    readonly type: typeof USER_ORDERS_WS_CONNECTION_SUCCESS;
}

export type TUserOrdersWsConnectionErrorAction = {
    readonly type: typeof USER_ORDERS_WS_CONNECTION_ERROR;
    readonly payload: string;
}

export type TUserOrdersWsConnectionClosedAction = {
    readonly type: typeof USER_ORDERS_WS_CONNECTION_CLOSED;
    readonly payload: string;
}

export type TUserOrdersWsGetMessageAction = {
    readonly type: typeof USER_ORDERS_WS_GET_MESSAGE;
    readonly payload: TOrderList;
}

export type TUserOrdersActions = TUserOrdersWsConnectionStartAction |
  TUserOrdersWsConnectionSuccessAction | 
  TUserOrdersWsConnectionErrorAction | 
  TUserOrdersWsConnectionClosedAction | 
  TUserOrdersWsGetMessageAction 
