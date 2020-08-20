import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogToAddTitle, setblogToAddTitle] = useState('')
  const [blogToAddAuthor, setBlogToAddAuthor] = useState('')
  const [blogToAddUrl, setBlogToAddUrl] = useState('')

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')

      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error during logout')
      setTimeout(() => {
        setErrorMessage(exception)
      }, 3000)
    }
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username&nbsp;
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password&nbsp;
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogDisplay = () => (
      <div>
      <h2>Blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const addBlog = () => {
    blogService.createNew(blogToAddTitle, blogToAddAuthor, blogToAddUrl, user)

    setErrorMessage(`New blog added!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    
  }

  const createNewBlog = () => (
    <div>
    <h2>Create new blog</h2>
    <form onSubmit={addBlog}>
        <div>
          Title&nbsp;
            <input
            type="text"
            value={blogToAddTitle}
            name="Title"
            onChange={({ target }) => setblogToAddTitle(target.value)}
          />
        </div>
        <div>
          Author&nbsp;
            <input
            type="text"
            value={blogToAddAuthor}
            name="Title"
            onChange={({ target }) => setBlogToAddAuthor(target.value)}
          />
        </div>
        <div>
          URL&nbsp;
            <input
            type="text"
            value={blogToAddUrl}
            name="Title"
            onChange={({ target }) => setBlogToAddUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
  </div>
)

  

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
          {loginForm()}
        </div>
      )
    }
  
    return (
      <div>
        <Notification message={errorMessage} />
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          {blogDisplay()}
          {createNewBlog()}
        
      </div>
    )
}

export default App