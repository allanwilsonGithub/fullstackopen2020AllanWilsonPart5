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

const createNew = (blogToAddTitle, blogToAddAuthor, blogToAddUrl, id, user) => {
  setToken(user.token)
  const request = 
  axios
  .post(baseUrl, {
    'title': blogToAddTitle,
    'author': blogToAddAuthor,
    'url': blogToAddUrl,
    'user': {
      'username': user.username,
      'id': id
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