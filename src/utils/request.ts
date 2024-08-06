type TServerResponse<T> = {
  success: Boolean;
} & T;

const checkResponse = <T>(res: Response): Promise<T>  => { 
  return res.ok? res.json() : res.json().then(failRes => Promise.reject(failRes));
};

const checkSuccess = <T>(res: TServerResponse<T>) => { 
  if (res && res.success) {
    const { success, ...data } = res;
    return data as T
  }
  if (!res.success) return Promise.reject(`Ответ от сервера некорректный (не success)`);    
  return Promise.reject(`Нераспознанный ответ от сервера: ${res.toString()}`);
}


export const request = <T>(endpoint: string, options?: any, baseUrl = 'https://norma.nomoreparties.space/api/') => {
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse<TServerResponse<T>>)
    .then(checkSuccess<T>);
} 