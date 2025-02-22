# Log from Feb 21st

Database connection is up, but there's a couple of problems.

1. Secret is not stored and everyone and check repo and steal data (although all posts are visible), should keep this in Github Secrets.

2. Database connection is still fragile and not tested thoroughly.

3. MongoDB is allowed from anywhere as 0.0.0.0/0, will need to setup specific ip addresses to log later on.

Other than that, how do you start the backend?

1. make sure you have npm.

2. npm install, and npm run start, wait for the `MongoDB connected successfully` to pop up to make sure it's connected.
Note: you can also connect to mongodb via mongo compass, you should be using this URL as "mongodb+srv://support:7HowrRgu5IT3rApO@discussion-forum.q8ono.mongodb.net/" (to be deleted)

3. you can test some of the api calls, for example, try GET request `http://localhost:5001/api/posts/` and it should display some testing posts I make. There's currently no direct display of all comments, we will get to that.