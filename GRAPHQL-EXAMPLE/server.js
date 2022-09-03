// importing nomde moules
const path = require('path');
// importing npm modules
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
// importing modules
const products = require('./products/products.model');
const orders = require('./orders/orders.model');

// loding schemas
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
// loading resolvers
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

// configuring graphql
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const root = {
  products,
  orders,
};

// creating the app
const app = express();

// middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// starting the server
app.listen(3000, () => {
  console.log(`\nRunning GraphQL server on port 3000 ...\n`);
});
