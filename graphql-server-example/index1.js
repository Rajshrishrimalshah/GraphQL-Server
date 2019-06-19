import { ApolloServer, gql } from "apollo-server";


const students = [
  {
    id: 1,
    firstName: "XYZ",
    lastName: "WSN",
    college: "KJCOEMR",
    married: true,

  },
  {
    id:2,
    firstName: "ABC",
    lastName: "EFG",
    college: "Wadia-College",
    married: false
  }
]

const books = [
  {
    id: 1,
    name: "Cloud computing",
    author: "JD",
    studentId: 1
  },
  {
    id: 2,
    name: "GraphQL",
    author: "RJ"
  }
]

// const typeDefs = gql `

// type Student {
//   id: Int!,
//   firstName: String,
//   lastName: String,
//   college: String,
//   married: Boolean,
//   book: [Book]
// }

// type Book {
//   id: Int!,
//   name: String
// }

// type Query {
//   students: [Student]
//   book: Book
// }
// `;

const typeDefs = `
type Query {
  info: Info!
  feed: [Link!]!
}



type Link {
  id: ID!
  description: String!
  url: String!
  info: Info
}

type Info {
  info: String!
}

`

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
  info: 'aafa'
}]

const info = {
  info: `This is the API of a Hackernews Clone`
};

const resolvers = {
  Query: {
    info: () => info,
    // 2
    feed: () => links,
  },
  // 3
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
    info: (parent) => parent.info
  }
}

// const resolvers = {
//   Query: {
//     students: () => students,
//     book: () => {
//       console.log('daaaafaf', id);
//     }
//   }
// };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
