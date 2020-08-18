import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = () => {
  const request = 
  axios
  .post(baseUrl, {
    'title': 'Robert THE Burns 22222222222222222',
    'author': 'Robert THE Burns 222222222222222',
    'url': 'http://burns.gov/blog/222222222222',
    'likes': 1,
    'user': {
      'username': 'allan 123',
      'id': '5f20297efe38103799d7c8cd'
    }
  },
  {
    headers: {
      'Authorization': token
    }
  })

  return request.then(response => response.data)
}

export default { getAll, setToken, createNew }