import React, { useState } from 'react'
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlogs, user }) => {
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

  const onLikeClick = async () => {
          await blogService
              .addLike({blog})
          updateBlogs()    
  }

  const onRemoveClick = async () => {
    if (window.confirm("Really remove?")) { 
    await blogService
      .deleteBlog({blog, user})
    updateBlogs()
}}

  const showWhenExpanded = {
    display: expanded ? '' : 'none'
  }
  
  let createdByCurrentUser = false
  if (user.name === blog.user.name){
    createdByCurrentUser = true
  }

  const showIfCurrentUser = {
    display: createdByCurrentUser ? '' : 'none'
  }

  return (
      <div style={blogStyle}>
        "{blog.title}" &nbsp;-&nbsp; {blog.author} &nbsp;
        <button onClick={onViewClick}>View</button>
        <div style={showWhenExpanded}>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={onLikeClick}>Like</button></p>
          <p>user: {blog.user.name}</p>
          <p><button style={showIfCurrentUser} onClick={onRemoveClick}>Remove</button></p>
        </div>
      </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog