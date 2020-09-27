import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

describe('Create Blog Form Test', () => {

test('renders content', () => {
  
  const setErrorMessage = ( text ) => {}
  const user = ""
  const createNewBlogMock = jest.fn()

  const component = render(
    <CreateBlogForm setErrorMessage={setErrorMessage} user={user} createNewBlog={createNewBlogMock}/>
  )
  
  expect(component.container).toHaveTextContent(
    'Create new blog'
  )
  
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, { 
    target: { value: 'Zaphod Beeblebrox' } 
  })

  fireEvent.change(title, { 
    target: { value: 'If I ever meet myself' } 
  })

  fireEvent.change(url, { 
    target: { value: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy' } 
  })

  fireEvent.submit(form)

  expect(createNewBlogMock.mock.calls).toHaveLength(1)

  expect(createNewBlogMock.mock.calls[0][0]).toBe('If I ever meet myself')
  expect(createNewBlogMock.mock.calls[0][1]).toBe('Zaphod Beeblebrox')
  expect(createNewBlogMock.mock.calls[0][2]).toBe('https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy')

})
})