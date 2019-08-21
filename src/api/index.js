import {ApolloServer} from 'apollo-server';

import { TestAPI } from './TestAPI';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    TraineeAPI: new TestAPI(),
  }),
  context: () => {},
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
