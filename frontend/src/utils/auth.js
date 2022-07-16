const API_URL = 'https://api.marina.nomorepartiesxyz.ru'
/* const API_URL = 'https://auth.nomoreparties.co' */
/* const API_URL = 'http://localhost:3000' */

export const register = (email, password) => {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(response => {
    if (response.status === 201) {
      return response.json()
    } else {
      return response
    }
  })
}

export const login = (email, password) => {
  return fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse)
}

export const checkToken = token => {
  return fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    if (response.status === 200) {
      return response.json()
    }
  })
}

const checkResponse = response => {
  if (response.ok) {
    return response.json()
  }
}
