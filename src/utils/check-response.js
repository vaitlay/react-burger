export const checkResponse = (res) => { 
  if (!res.ok) return Promise.reject(`Ошибка соединения с сервером: ${res.status}`); 
  return res.json();      
}