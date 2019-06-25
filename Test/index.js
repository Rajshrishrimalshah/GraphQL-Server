import { ApolloServer, gql, IResolverObject } from "apollo-server";
import fetch from "node-fetch";
import { RandomUserDataSource } from "./RandomUserDataSource";

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

  type Query {
    randomPerson: [Person!]!
    randomPerson2: [Person!]!
    randomPerson3: Trainee

  }
`;

const resolvers = {
  Query: {
    randomPerson: async () => {
      const response = await fetch("https://api.randomuser.me/", );
      const data = await response.json();
      return data.results;
    },
    randomPerson2: (_, __, { dataSources }) => {
      return dataSources.randomUserAPI.getPerson();
    },
    randomPerson3: async () => {
      const response = await fetch("https://express-training.herokuapp.com/api/user/me",{
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2MTQ2MDcyN30.vErXlgx_p7hnd4EAr3wjCY039Yz8wYUNXVxlxu2ECik'
      }
    });
    console.log(response);
    const { data } = response;
    return data;
  }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    randomUserAPI: new RandomUserDataSource()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
