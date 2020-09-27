import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

describe('Blog Tests', () => {
  let component

beforeEach(() => {

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

component = render(
  <Blog blog={blog} updateBlogs={updateBlogs} user={user}/>
  )
})


test('renders content', () => {
  expect(component.container).toHaveTextContent(
    'Cycling Home Drunk'
  )

  expect(component.container).toHaveTextContent(
    'Allan Wilson'
  )
  
  const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

test('clicks view button', () => {

    expect(component.container).toHaveTextContent(
      'Cycling Home Drunk'
    )
  
    expect(component.container).toHaveTextContent(
      'Allan Wilson'
    )

    const button = component.getByText('View')
    fireEvent.click(button)
    
    const div = component.container.querySelector('.togglableContent')
  
      expect(div).toHaveStyle('')
    })


})

test('click like button twice', () => {

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

  const updateBlogs = jest.fn()

  const user = {
    "username": "allan 789",
    "name": "Allan Wilson 789",
    "id": "5f202921fe38103799d7c8cb"
  }

  let component = render(
    <Blog blog={blog} updateBlogs={updateBlogs} user={user}/>
  )

  expect(component.container).toHaveTextContent(
    'Cycling Home Drunk'
  )

  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveStyle('display: none')

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)
    
  expect(div).toHaveStyle('')

  const likeButton = component.getByText('Like')

  fireEvent.click(likeButton)
  expect(updateBlogs.mock.calls).toHaveLength(1)
  fireEvent.click(likeButton)
  expect(updateBlogs.mock.calls).toHaveLength(2)

})