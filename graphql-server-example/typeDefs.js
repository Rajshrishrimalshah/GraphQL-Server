import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    newTrainee: Trainee
  }

  type Trainee {
    name: String
    role: String
    email: String
  }
`;
