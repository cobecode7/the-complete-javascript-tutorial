const PORT = 4000;
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    doesItWork: Boolean!
  }
`;
const resolvers = {
  Query: {
    doesItWork: () => true,
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`The express app runs on port ${PORT}`);
    console.log(`The Apollo Server runs on port ${PORT}${server.graphqlPath}`);
  });
}

startServer();
