import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch } from '../types';
  
// Хук не даст отправить экшен, который ему не знаком
//export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useDispatch: () => AppDispatch = dispatchHook;