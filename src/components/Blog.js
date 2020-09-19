import React, { useState } from 'react'
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

  const onClick = () => {
    console.log('View clicked')
    setExpanded(!expanded)
  }

  const onLikeClick = () => {
          blogService
              .addLike(blogToAddTitle, blogToAddAuthor, blogToAddUrl, user, 99)

          setErrorMessage(`Likes increased by 1 !`)
          setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
  }

  const showWhenExpanded = {
    display: expanded ? '' : 'none'
  }
  console.log('showWhenExpanded: ', showWhenExpanded)

  return (
      <div style={blogStyle}>
        "{blog.title}" &nbsp;-&nbsp; {blog.author} &nbsp;
        <button onClick={onClick}>View</button>
        <div style={showWhenExpanded}>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={onLikeClick}>Like</button></p>
          <p>user: {blog.user.name}</p>
        </div>
      </div>
  )
}

export default Blog