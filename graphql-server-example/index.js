import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

let users = [];
const schema = gql`
  type Query {
    users: [User]
    user(id: Int): User
  }

  type Mutation {
    createUser(id: Int, username: String): User
    deleteUser(id: Int): User

  }

  type User {
    id: Int
    username: String
  }
`;

const resolvers = {
  Query: {
    users: () =>  { return users },

    user: (parent, { id }) => {
      const user = users.filter( user => id === user.id);
      return user[0];
    }
  },

  Mutation: {
    createUser: (parent, {id, username}) => {
    let user = {id, username};
    users = [ ...users, user ]
    return user;
    },

    deleteUser: (parent, {id}) => {
      let temp={};
      users = users.filter(user => {
          if (user.id !== id){
            return user;
          }
          temp = user;
      });
      return temp;
    }
  }


};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
