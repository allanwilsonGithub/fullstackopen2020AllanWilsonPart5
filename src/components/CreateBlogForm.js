import React, {useState} from 'react'
import blogService from "../services/blogs";

const CreateBlogForm = ({ createBlog, setErrorMessage, user }) => {
    const [blogToAddTitle, setblogToAddTitle] = useState('')
    const [blogToAddAuthor, setBlogToAddAuthor] = useState('')
    const [blogToAddUrl, setBlogToAddUrl] = useState('')

    const addBlog = () => {
        blogService
            .createNew(blogToAddTitle, blogToAddAuthor, blogToAddUrl, user)

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
                        type="text"
                        value={blogToAddTitle}
                        name="Title"
                        onChange={({ target }) => setblogToAddTitle(target.value)}
                    />
                </div>
                <div>
                    Author&nbsp;
                    <input
                        type="text"
                        value={blogToAddAuthor}
                        name="Title"
                        onChange={({ target }) => setBlogToAddAuthor(target.value)}
                    />
                </div>
                <div>
                    URL&nbsp;
                    <input
                        type="text"
                        value={blogToAddUrl}
                        name="Title"
                        onChange={({ target }) => setBlogToAddUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
export default CreateBlogForm



