npm run start

CI=true npm test .

Part 5 - Fullstack Open 2020 summary:

- User administration
    backend tests with postman
    frontend login page
- Token authentication
   Save the token to the browser's local storage
- Use ESLint
- Integration testing:
    Render component and use expect...
    src/components/Blog.test.js
    npm install --save-dev @testing-library/react @testing-library/jest-dom
- End-to-End tests: Cypress:
    cypress/integration/blog_app.spec.js
    



Feature list:
create new users by doing a HTTP POST-request to address api/users. Users have username, password and name.
Do not save passwords to the database as clear text, but use the bcrypt library 
Implement a way to see the details of all users by doing a suitable HTTP request.
restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique.
The operation must respond with a suitable status code and some kind of an error message if invalid user is created.
Mongoose validation.
Implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message.
Expand blogs so that each blog contains information on the creator of the blog.
list all blogs so that the creator's user information is displayed with the blog
listing all users also displays the blogs created by each user
Implement token-based authentication
Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request.
The user identified by the token is designated as the creator of the blog.
Middleware should take the token from the Authorization header and place it to the token field of the request object.
Change the delete blog operation so that a blog can be deleted only by the user who added the blog
deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator.
If deleting a blog is attempted without a token or by a wrong user, the operation should return a suitable status code.
test to ensure adding a blog fails with the proper status code 401 Unauthorized if a token is not provided.

################################################
Continuing now with:
https://fullstackopen.com/en/part7/webpack

make sure the public ssh key is stored at github
clone using SSH : git clone git@github.com:allanwilsonGithub/fullstackopen2020AllanWilsonPart5.git
ssh -T git@github.com
eval "$(ssh-agent -s)"
