import { ApolloServer, gql, IResolverObject } from "apollo-server";
import fetch from "node-fetch";
import { RandomUserDataSource } from "./RandomUserDataSource";
import { Trainee } from "./Trainee";

const typeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
  }

  type Trainee {
    name: String
    role: String
    email: String
  }

  type Message{
    message: String
  }

  type Query {
    randomPerson: [Person!]!
    getPerson: [Person!]!
    getTraineeFetch: Trainee
    getTrainee: Trainee
    getTraineeDetail: [Trainee]
  }

  type Mutation {
    createTrainee: String
  }
`;

const resolvers = {
  Query: {
    randomPerson: async () => {
      const response = await fetch("https://api.randomuser.me/");
      const data = await response.json();
      return data.results;
    },
    getPerson: (_, __, { dataSources }) => {
      return dataSources.randomUserAPI.getPerson();
    },
    getTraineeFetch: async () => {
      const response = await fetch(
        "https://express-training.herokuapp.com/api/user/me",
        {
          method: "GET",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2MTQ2MDcyN30.vErXlgx_p7hnd4EAr3wjCY039Yz8wYUNXVxlxu2ECik"
          }
        }
      );
      const res = await response.json();
      return res.data;
    },
    getTrainee: (_, __, { dataSources }) => {
      return dataSources.trainee.getTrainee();
    },
    getTraineeDetail: (_, __, { dataSources }) => {
      return dataSources.trainee.getTraineeDetails();
    }
  },

  Mutation: {
    createTrainee: async (_,__, { dataSources }) => {
      const res = await dataSources.trainee.createTrainee();
      return res;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    randomUserAPI: new RandomUserDataSource(),
    trainee: new Trainee()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
