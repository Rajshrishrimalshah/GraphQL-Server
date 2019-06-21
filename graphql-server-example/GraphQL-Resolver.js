import { ApolloServer,gql } from 'apollo-server-express';
import { find, filter } from "lodash";
import express from 'express';

const users = {
  errors: [
    {
      field: "Username",
      message: "Bad Word"
    },
    {
      field: "Password",
      message: "Bad choice"
    }
  ],
  user: {
    id: 1,
    username: "RAJ"
  }
};

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    user(name: String): UserDemo
  }

  type UserDemo {
    id: ID
    username: String!
  }

  input UserInfo {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    register(userInfo: UserInfo): RegisterResponse
    login(userInfo: UserInfo): RegisterResponse
  }

  type RegisterResponse {
    errors: [Error]
    user: User
  }

  type Error {
    field: String!
    message: String!
  }

  type User {
    id: ID!
    username: String!
    firstLetterOfResolver: String!
  }
`;

const resolvers = {
  UserDemo: {
    username: (parent, {name})=> {
      return `I am ${parent.username} from UserDemo`;
    }
  },

  Query: {
    hello: (_, {name} ) => `hello ${name}`,
    user:  (_, {name}) => ({
      id:1,
      username: `${name}`,
    })
  },

  Mutation: {
    login: async (parent, { userInfo: { username } }, context) => {
      // resolvers are async
      //check password
      // await checkPassword()
      users.user.username =username;
      console.log("users :",users);
      return users;
    },
    register: (parent, args) => users
  },

  User: {
    username: parent => {
      // console.log(parent);
      return parent.username
    }
  },

  User: {
    firstLetterOfResolver: parent => {
      return parent.username ? parent.username[0] : null
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => (req, res)
});

const app = express();

server.applyMiddleware({ app, path: '/graphql' });


app.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
});
