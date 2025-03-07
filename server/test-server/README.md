# Next_Unicorn

This is a mock server featuring a mock database. It is a simple authentication procedure.

## How to run the server

You need Node.js V22.60 and after because `--experimental-strip-types` will have to be used.

Just install using `npm i` based on the `package.json`, and then run with `node --experimental-strip-types express.js`. The server will output any inputs sent.

## How to use the API

Just use curl.

`curl -d '{"username":"Mack","password":"fizzbuzz"}' -H "Content-Type:application/json" -X POST http://localhost:3001/investor/login`

The possible results for logging in are:

* 200: User, password, and type are correct.
* 403: At least one of the attributes are incorrect.
* 400: A bad request, considered when user or password is undefined.

The possible results for the restricted pages are:

* 200: User is logged in, supplied from the frontend.
* 403: User is not found or revoked.
