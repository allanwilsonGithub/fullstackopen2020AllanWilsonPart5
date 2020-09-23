import React, { useState } from 'react'
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlogs }) => {
  const [expanded, setExpanded] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

  const onViewClick = () => {
    setExpanded(!expanded)
  }

  const onLikeClick = () => {
          blogService
              .addLike({blog})
          updateBlogs()
          
  }

  const showWhenExpanded = {
    display: expanded ? '' : 'none'
  }

  return (
      <div style={blogStyle}>
        "{blog.title}" &nbsp;-&nbsp; {blog.author} &nbsp;
        <button onClick={onViewClick}>View</button>
        <div style={showWhenExpanded}>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={onLikeClick}>Like</button></p>
          <p>user: {blog.user.name}</p>
        </div>
      </div>
  )
}

export default Blog