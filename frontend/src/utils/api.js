class Api {
  constructor (url, headers) {
    this._url = url
    this._headers = headers
  }
  _makeRequest (promise) {
    return promise.then(res => {
      if (res.ok) {
        return res.json()
      }
    }).catch(err => console.log(`Request failed ${err.status}`))
  }
  getCards (jwt) {
    return this._makeRequest(
      fetch(`${this._url}/cards`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      }
    ))
  }
  getProfileInfo (jwt) {
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      }
    ))
  }
  postCard ({ name, url },jwt) {
    const promise = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        link: url
      })
    })
    return this._makeRequest(promise)
  }
  deleteCard (id,jwt) {
    const promise = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    return this._makeRequest(promise)
  }
  editProfileInfo ({ name, about },jwt) {
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          name,
          about
        })
      })
    )
  }

  changeAvatar (avatar,jwt) {
    return this._makeRequest(
      fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          avatar
        })
      })
    )
  }
  changeLikeCardStatus (id, isLiked,jwt) {
    return this._makeRequest(
      fetch(`${this._url}/cards/${id}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      })
    )
  }
}

/* const api = new Api('https://mesto.nomoreparties.co/v1/cohort-38', {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  authorization: 'c5a7c514-ca8f-4b82-95f7-7b25ec57dd45'
}) */
/* const api = new Api('http://localhost:3000', {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8'
}) */
const api = new Api('https://api.marina.nomorepartiesxyz.ru')

export default api
