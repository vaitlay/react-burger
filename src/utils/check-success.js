export const checkSuccess = (res) => { 
    if (res && res.success) return res;
    if (!res.success) return Promise.reject(`Ответ от сервера некорректный (не success)`);   
    return Promise.reject(`Нераспознанный ответ от сервера: ${res.toString()}`);
  }