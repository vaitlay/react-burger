import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { RootState } from '../types';
  
// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook