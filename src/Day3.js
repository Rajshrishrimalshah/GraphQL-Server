import express from "express";
import { ApolloServer, gql, PubSub, withFilter } from "apollo-server-express";
import http from "http";

const user_Added = "USER_ADDED";
const user_Updated = "USER_UPDATED";
const pubsub = new PubSub();

let users = [];
const typeDefs = gql`
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
    userAdded(id: Int): User
    userUpdated: User
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return users;
    },

    user: (parent, { id }) => {
      const user = users.filter(user => id === user.id);
      return user[0];
    }
  },

  Mutation: {
    async createUser(parent, { id, username }) {
      let user = { id, username };
      users = [...users, user];
      await pubsub.publish(user_Added, { userAdded: user });
      return user;
    },

    deleteUser: (parent, { id }) => {
      let temp = {};
      users = users.filter(user => {
        if (user.id !== id) {
          return user;
        }
        temp = user;
      });
      return temp;
    },

    async updateUser(parent, { id, username }) {
      let userData = { id, username };
      users.map(user => {
        if (user.id === id) {
          (user.id = id), (user.username = username);
        }
      });
      await pubsub.publish(user_Updated, { userUpdated: userData });
      return userData;
    }
  },

  //subscribe: () => pubsub.asyncIterator(user_Added)
  Subscription: {
    userAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(user_Added),
        (payload, variables) => {
        return payload.userAdded.id === variables.id
        },
      ),
    }
    ,
    userUpdated: {
      subscribe: () => pubsub.asyncIterator(user_Updated)
    }
  }
};

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 9000 }, () => {
  console.log("Apollo Server on http://localhost:9000/graphql");
});
