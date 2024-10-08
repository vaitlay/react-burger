import { TOrderList } from '../../types';

export const ALL_ORDERS_WS_CONNECTION_START: 'ALL_ORDERS_WS_CONNECTION_START' = 'ALL_ORDERS_WS_CONNECTION_START';
export const ALL_ORDERS_WS_CONNECTION_SUCCESS: 'ALL_ORDERS_WS_CONNECTION_SUCCESS' = 'ALL_ORDERS_WS_CONNECTION_SUCCESS';
export const ALL_ORDERS_WS_CONNECTION_CLOSED: 'ALL_ORDERS_WS_CONNECTION_CLOSED' = 'ALL_ORDERS_WS_CONNECTION_CLOSED';
export const ALL_ORDERS_WS_CONNECTION_ERROR: 'ALL_ORDERS_WS_CONNECTION_ERROR' = 'ALL_ORDERS_WS_CONNECTION_ERROR';
export const ALL_ORDERS_WS_GET_MESSAGE: 'ALL_ORDERS_WS_GET_MESSAGE' = 'ALL_ORDERS_WS_GET_MESSAGE';

export type TWSAllOrdersActions = {
    wsInit: typeof  ALL_ORDERS_WS_CONNECTION_START,
    onOpen: typeof  ALL_ORDERS_WS_CONNECTION_SUCCESS,
    onClose: typeof ALL_ORDERS_WS_CONNECTION_CLOSED,
    onError: typeof  ALL_ORDERS_WS_CONNECTION_ERROR,
    onMessage: typeof  ALL_ORDERS_WS_GET_MESSAGE
  };

export const wsAllOrdersActions: TWSAllOrdersActions = {
    wsInit: ALL_ORDERS_WS_CONNECTION_START,
    onOpen: ALL_ORDERS_WS_CONNECTION_SUCCESS,
    onClose: ALL_ORDERS_WS_CONNECTION_CLOSED,
    onError: ALL_ORDERS_WS_CONNECTION_ERROR,
    onMessage: ALL_ORDERS_WS_GET_MESSAGE
}  


export type TAllOrdersWsConnectionStartAction = {
    readonly type: typeof ALL_ORDERS_WS_CONNECTION_START;
    readonly payload: {url: string, sendToken : boolean};
}

export type TAllOrdersWsConnectionSuccessAction = {
    readonly type: typeof ALL_ORDERS_WS_CONNECTION_SUCCESS;
}

export type TAllOrdersWsConnectionErrorAction = {
    readonly type: typeof ALL_ORDERS_WS_CONNECTION_ERROR;
    readonly payload: string;
}

export type TAllOrdersWsConnectionClosedAction = {
    readonly type: typeof ALL_ORDERS_WS_CONNECTION_CLOSED;
    readonly payload: string;
}

export type TAllOrdersWsGetMessageAction = {
    readonly type: typeof ALL_ORDERS_WS_GET_MESSAGE;
    readonly payload: TOrderList;
}

export type TAllOrdersActions = TAllOrdersWsConnectionStartAction |
  TAllOrdersWsConnectionSuccessAction | 
  TAllOrdersWsConnectionErrorAction | 
  TAllOrdersWsConnectionClosedAction | 
  TAllOrdersWsGetMessageAction 
