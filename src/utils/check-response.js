export const checkResponse = (res) => { 
  if (!res.ok) return res.json().then(failRes => Promise.reject(failRes)); 
  return res.json(); 
}