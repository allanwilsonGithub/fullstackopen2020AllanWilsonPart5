import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

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
  const [loginVisible, setLoginVisible] = useState(false)

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



  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
    )
  }

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

        <Togglable buttonLabel="New Blog">
          <CreateBlogForm
              onSubmit={addBlog}
              blogToAddUrl={blogToAddUrl}
              blogToAddAuthor={blogToAddAuthor}
              handleBlogTitleChange={({ target }) => setblogToAddTitle(target.value)}
              handleBlogUrlChange={({ target }) => setBlogToAddUrl(target.value)}
              handleBlogAuthorChange={({ target }) => setBlogToAddAuthor(target.value)}
          />
        </Togglable>
        
      </div>
    )
}

export default App