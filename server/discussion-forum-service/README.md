# Instructions

## How to start the application

1. open terminal, run `npm install`.

2. run `npm run start`.

3. if encounter database issues when opening, reach out to team lead. And if it starts correctly, continue.

4. test via postman or call from frontend. E.g. GET `http://localhost:5001/api/posts/` gives you all posts


# Logs

## Log from Feb 22st

All current APIs are tested and ensured correct.

## Log from Feb 21st

Database connection is up, but there's a couple of problems.

1. Secret is not stored and everyone and check repo and steal data (although all posts are visible), should keep this in Github Secrets.

2. MongoDB is allowed from anywhere as 0.0.0.0/0, will need to setup specific ip addresses to log later on.