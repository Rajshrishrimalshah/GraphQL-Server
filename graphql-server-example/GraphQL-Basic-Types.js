import { ApolloServer, gql } from "apollo-server";
import { find, filter } from "lodash";

const users = {
  errors: [
    {
      field: "Username",
      message: "Bad Word"
    },
    {
      field: "Password",
      message: "Bad choice"
    }
  ],
  user: {
    id: 1,
    username: "BOB"
  }
};

const typeDefs = gql`
  type Query {
    hello: String!
  }

  input UserInfo {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    register(userInfo: UserInfo): RegisterResponse
    login(userInfo: UserInfo): Boolean!
  }

  type RegisterResponse {
    errors: [Error]
    user: User
  }

  type Error {
    field: String!
    message: String!
  }

  type User {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello Raj !"
  },
  Mutation: {
    login: () => true,
    register: () => users
  }
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
