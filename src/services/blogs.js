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

const createNew = async (blogToAddTitle, blogToAddAuthor, blogToAddUrl, user) => {
  setToken(user.token)
  const request = 
  await axios
  .post(baseUrl, {
    'title': blogToAddTitle,
    'author': blogToAddAuthor,
    'url': blogToAddUrl
  },
  {
    headers: {
      'Authorization': token
    }
  })

  
  return request.then(response => response.data)
}

const addLike = async (blogToAddTitle, blogToAddAuthor, blogToAddUrl, user, likes) => {
  setToken(user.token)
  const request =
      await axios
          .put(baseUrl, {
            'user': user,
            'likes': likes,
            'author': blogToAddAuthor,
            'title':blogToAddTitle,
            'url': blogToAddUrl
              },
              {
                headers: {
                  'Authorization': token
                }
              })


  return request.then(response => response.data)
}

export default { getAll, setToken, createNew, addLike }