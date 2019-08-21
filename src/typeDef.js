import { gql } from "apollo-server";

const typeDefs = gql`

  type Name {
    title: String
    first: String
    last: String
  }

  type Coordinates {
    latitude: String,
    longitude: String
  }

  type Location {
    street: String,
    city: String,
    state: String,
    postcode: Int
    coordinates: Coordinates
  }

  type Person {
    name: Name,
    location: Location,
    gender: String,
    email: String,
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

export { typeDefs };
