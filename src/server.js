import { ApolloServer } from "apollo-server";
import { RandomUserDataSource } from "./RandomUserDataSource";
import { Trainee } from "./Trainee";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDef";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      const token = req.headers.authorization || "";
      return { token };
    }
  },
  dataSources: () => ({
    randomUserAPI: new RandomUserDataSource(),
    trainee: new Trainee()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
