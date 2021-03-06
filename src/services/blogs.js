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

  return request.data
}


const deleteBlog = async ({ blog, user }) => {
  setToken(user.token)
  await axios
    .delete(baseUrl + '/' + blog.id,
      {
        headers: {
          'Authorization': token
        }
      })
}

const addLike = async ({ blog }) => {
  setToken(blog.user.token)
  await axios
    .put(baseUrl + '/' + blog.id, {
      'id': blog.user.name,
      'likes': blog.likes + 1,
      'author': blog.author,
      'title':blog.title,
      'url': blog.url
    },
    {
      headers: {
        'Authorization': token
      }
    })
}



export default { getAll, setToken, createNew, addLike, deleteBlog }