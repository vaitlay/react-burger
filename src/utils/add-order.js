export const addOrder = async (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: data})
  })
    .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка соединения с сервером: ${res.status}`);
        }
        return res.json();
      })
    .then(res => {
        if (!res.success) {
          return Promise.reject('Корректный ответ от сервера не получен')
        }
        return Promise.resolve(res.order);
      })
  };

