import React, {useState} from 'react'

const CreateBlogForm = ({ setErrorMessage, user, createNewBlog }) => {
    const [blogToAddTitle, setblogToAddTitle] = useState('')
    const [blogToAddAuthor, setBlogToAddAuthor] = useState('')
    const [blogToAddUrl, setBlogToAddUrl] = useState('')

    const addBlog = async () => {
        await createNewBlog(blogToAddTitle, blogToAddAuthor, blogToAddUrl, user)  // CreateNewBlog was added only so that the prop can be mocked in CreateBlogForm.tests.js for this course
        setErrorMessage(`New blog added!`)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)


    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title&nbsp;
                    <input
                        id='title'
                        type="text"
                        value={blogToAddTitle}
                        name="Title"
                        onChange={({ target }) => setblogToAddTitle(target.value)}
                    />
                </div>
                <div>
                    Author&nbsp;
                    <input
                        id='author'
                        type="text"
                        value={blogToAddAuthor}
                        name="Author"
                        onChange={({ target }) => setBlogToAddAuthor(target.value)}
                    />
                </div>
                <div>
                    URL&nbsp;
                    <input
                        id='url'
                        type="text"
                        value={blogToAddUrl}
                        name="URL"
                        onChange={({ target }) => setBlogToAddUrl(target.value)}
                    />
                </div>
                <button id='createBlogButton' type="submit">Create</button>
            </form>
        </div>
    )
}
export default CreateBlogForm



