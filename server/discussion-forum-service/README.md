# discussion-forum

## Getting Started
Below is documentation for using the discussion forum service:
1. You need to install MongoDB locally, follow this: https://www.mongodb.com/docs/manual/installation/ (and follow MongoDB Community Edition)
2. Run the MongoDB daemon for your OS (as per instructions in the docs above) (this part is highly OS specific and may take time to setup)
3. Create a new collection and name it “Discussion-Forum”
4. Create a `.env.local` file with: `MONGODB_CONNECTION="mongodb://127.0.0.1:27017/Discussion-Forum"`
5. To start the server,
    1. `npm i` - to install
    2. `npm run dev` - to run the local test server
6. If you want to test the production database, you can replace the `.env.local` file with `MONGODB_CONNECTION="<PRODUCTION-DB-URL>"` - THIS IS NOT RECOMMENDED

At the same time you also need to create a `.env` file with `MONGODB_CONNECTION="<PRODUCTION-DB-URL>"`. The purpose of two separate environment files is to make sure that locally (when you are testing) you do not modify the production database.

## Testing
To run tests against the API on a local MongoDB instanc
1. Start the server with `npm run dev`
2. You can run automated tests for `/api/posts` and `/api/comments`, with `npm run test`.
3. You can also explore the API with Swagger UI by going to [localhost:5001/api-docs](http://localhost:5001/api-docs/)