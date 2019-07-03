import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { typeDefs } from "./typeDef";
import { resolvers } from "./resolvers";

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 9000 }, () => {
  console.log("Apollo Server on http://localhost:9000/graphql");
});
