import { ApolloServer, gql, PubSub } from "apollo-server-express";

export const schema = gql`
  type Query {
    users: [User]
    user(id: Int): User
  }

  type Mutation {
    createUser(id: Int, username: String): User
    deleteUser(id: Int): User
    updateUser(id: Int, username: String): User
  }

  type User {
    id: Int
    username: String
  }

  type Subscription {
    newUser: User!
  }
`;
