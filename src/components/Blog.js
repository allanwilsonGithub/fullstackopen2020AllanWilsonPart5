import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const onClick = () => {
    console.log('clicked')
    setExpanded(!expanded)
  }

  const showWhenExpanded = {
    display: expanded ? '' : 'none'
  }
  console.log('showWhenExpanded: ', showWhenExpanded)

  return (
      <div>
        {blog.title} {blog.author}
        <button onClick={onClick}>CLICK ME</button>
        <div style={showWhenExpanded}> JABADABADOO </div>
      </div>
  )
}

export default Blog