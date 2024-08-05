import { useState, useCallback } from 'react';

type TInput = [
  currentValue: string,
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setInput: Function
]

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useInput = (defaultValue: string = ''): TInput => {
  const [currentValue, setCurrentValue] = useState(defaultValue); 

  // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentValue(e.target.value);
  }, []);
  const setInput = useCallback((value: string) => setCurrentValue(value),[]);

  return [
    currentValue,
    onChangeInput,
    setInput
  ];
};