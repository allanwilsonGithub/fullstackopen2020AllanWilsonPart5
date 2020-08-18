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

const createNew = (blogToAddTitle, blogToAddAuthor, blogToAddUrl, username, userId) => {
  const request = 
  axios
  .post(baseUrl, {
    'title': blogToAddTitle,
    'author': blogToAddAuthor,
    'url': blogToAddUrl,
    'user': {
      'username': username,
      'id': userId
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