import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

test('renders content', () => {
  const blog = {
        "title": "Cycling Home Drunk",
        "author": "Allan Wilson",
        "url": "http://not-a-good-idea.com",
        "likes": 1,
        "user": {
            "username": "allan 123",
            "id": "5f22bf010f493d7a7a0a8d09"
        },
        "id": "5f20297efe38103799d7c8cd"
  }

  const updateBlogs = async () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }

  const user = {
    "username": "allan 789",
    "name": "Allan Wilson 789",
    "id": "5f202921fe38103799d7c8cb"
}

  const component = render(
    <Blog blog={blog} updateBlogs={updateBlogs} user={user}/>
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Cycling Home Drunk'
  )

  expect(component.container).toHaveTextContent(
    'Allan Wilson'
  )
  
  const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })