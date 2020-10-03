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
          updateBlogs()    // This extra call is added specifically to allow me to learn to mock in blog.test.js
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
      <div style={blogStyle} className='blog'>
        "{blog.title}" &nbsp;-&nbsp; {blog.author} &nbsp;
        <button id="blogViewButton" onClick={onViewClick}>View</button>
        <div style={showWhenExpanded} className="togglableContent">
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button id="likeButton" onClick={onLikeClick}>Like</button></p>
          <p>user: {blog.user.name}</p>
          <p><button id="removeButton" style={showIfCurrentUser} onClick={onRemoveClick}>Remove</button></p>
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