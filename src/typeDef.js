import { gql } from "apollo-server";

const typeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
  }

  type Trainee {
    _id: ID
    name: String
    role: String
    email: String
    originalId: ID
  }

  type Create {
    message: String
    data: Trainee
  }

  type Update {
    message: String
    data: Result
  }

  type Result {
    id: String
  }

  type Query {
    randomPerson: [Person!]!
    getPerson: [Person!]!
    getTraineeFetch: Trainee
    getTrainee: Trainee
    getTraineeDetail(limit: Int, skip: Int): [Trainee]
  }

  type Mutation {
    createTrainee(name: String, email: String, password: String): Create
    updateTrainee(id: String, name: String, email: String): Update
    deleteTrainee(id: String): Update
  }

  type Subscription {
    userCreated: Create
    userDeleted: Update
  }
`;

export {typeDefs};
