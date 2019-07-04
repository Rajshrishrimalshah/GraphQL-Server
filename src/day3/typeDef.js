import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User]
    user(id: Int): User
  }

  type Mutation {
    createUser(username: String): User
    deleteUser(id: Int): User
    updateUser(id: Int, username: String): User
  }

  type User {
    id: Int
    username: String
  }

  type Subscription {
    userAdded(id: Int): User
    userUpdated: User
    newUserAdded: User
  }
`;
