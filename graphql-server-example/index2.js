// schema.js
import { merge } from "lodash";
import { typeDef as Author, resolvers as authorResolvers } from "./author.js";
import { typeDef as Book, resolvers as bookResolvers } from "./book.js";
import { ApolloServer, gql } from "apollo-server";

const Query = `
  type Query {
    author(id: Int!): Author
    book(id: Int!): Book
  }
`;



const resolvers = {
  Query: {
    author: () => {
      return console.log("author");
    },
    book: () => {
      return console.log("book");
    }
  },
  Author: {
    name: () => {
      return console.log("author-NAME");
    }
  },
  Book: {
    title: () => {
      return console.log("book-title");
    }
  }
};

const server = new ApolloServer(  { typeDefs: [ Query, Author, Book ],
  resolvers: merge(resolvers, authorResolvers, bookResolvers), });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
