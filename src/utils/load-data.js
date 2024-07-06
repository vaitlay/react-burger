export const loadData = async (url) => {
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка соединения с сервером: ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        if (res.data.length === 0) {
          return Promise.reject('Нет данных от сервера')
        }
        return Promise.resolve(res.data);
      })
  };