import React from "react"

const CreateBlogForm = ({
                        onSubmit,
                        blogToAddUrl,
                        blogToAddAuthor,
                        blogToAddTitle,
                        handleBlogTitleChange,
                        handleBlogAuthorChange,
                        handleBlogUrlChange
                   }) => {
    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={onSubmit}>
                <div>
                    Title&nbsp;
                    <input
                        type="text"
                        value={blogToAddTitle}
                        name="Title"
                        onChange={handleBlogTitleChange}
                    />
                </div>
                <div>
                    Author&nbsp;
                    <input
                        type="text"
                        value={blogToAddAuthor}
                        name="Title"
                        onChange={handleBlogAuthorChange}
                    />
                </div>
                <div>
                    URL&nbsp;
                    <input
                        type="text"
                        value={blogToAddUrl}
                        name="Title"
                        onChange={handleBlogUrlChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
export default CreateBlogForm