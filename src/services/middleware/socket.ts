import { WS_ENTRY_POINT, checkTokenExpire } from '../../utils/api'
import type { Middleware, MiddlewareAPI } from 'redux';
import type {
  TApplicationActions,
  TWSStoreActions,
  AppDispatch,
  RootState,
} from '../../types';


export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    const accessToken = localStorage.getItem('accessToken');
    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        console.log('creating new Socket')
        const token = action.payload.sendToken ? `?token=${accessToken}` : '';
        socket = new WebSocket(`${WS_ENTRY_POINT}${action.payload.url}${token}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (success) {
            dispatch({ type: onMessage, payload: restParsedData })
          } else {
            if (restParsedData.message === 'Invalid or missing token') checkTokenExpire();
            dispatch({ type: onError, payload: restParsedData.message });
          }
          
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};