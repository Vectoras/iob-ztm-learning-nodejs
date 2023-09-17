// importing nomde moules
const path = require('path');
// importing npm modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
// importing modules
const products = require('./products/products.model');
const orders = require('./orders/orders.model');

// --- configuring the Apollo server --------

async function startApolloServer() {
  // create the express app
  const app = express();

  // retrieve the schema
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  // configure the Apollo server
  const server = new ApolloServer({
    schema,
  });

  // start the Apollo server
  await server.start();

  // apply the internally created middleware to the express app
  server.applyMiddleware({ app, path: '/graphql' });

  // starting the server
  app.listen(3000, () => {
    console.log(`\nRunning GraphQL server on port 3000 ...\n`);
  });
}

// --- configuring graphql ------------------

// loding schemas
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
// loading resolvers
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));
// setting up the root data object
const root = {
  products,
  orders,
};

// launch the server
startApolloServer();
