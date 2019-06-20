import { ApolloServer, gql } from "apollo-server";
import { find, filter } from "lodash";

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
    user: UserDemo
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
    login(userInfo: UserInfo): String!
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
    username: () => {
      return "I am username from UserDemo";
    }
  },

  Query: {
    hello: (parent, { name }) => {
      return `Hello  ${name}!`;
    },
    user: () => ({
      id: 1,
      username: "RAJ"
    })
  },

  Mutation: {
    login: async (parent, { userInfo: { username } }, context) => {
      // resolvers are async
      //check password
      // await checkPassword()
      return username;
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
