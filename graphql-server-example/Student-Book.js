import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import { find, filter } from "lodash";

const students = [
  {
    id: 1,
    firstName: "XYZ",
    lastName: "WSN",
    college: "KJCOEMR",
    married: true
  },
  {
    id: 2,
    firstName: "ABC",
    lastName: "EFG",
    college: "Wadia-College",
    married: false
  }
];

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
    author: "RJ",
    studentId: 2
  }
];

const typeDefs = gql`
  interface IStudent {
    id: Int!
    firstName: String
    lastName: String
    college: String
    book: [Book]
  }

  type Student implements IStudent {
    id: Int!
    firstName: String
    lastName: String
    college: String
    married: Boolean
    book: [Book]
  }

  type Book {
    id: Int!
    name: String
    student: Student
  }

  type Query {
    students: [Student]
    book(id: Int!): Book
  }
`;

const resolvers = {
  Query: {
    students: () => students,
    book: (_, { id }) => find(books, { id })
  },

  Student: {
    book: student => {
      return filter(books, { studentId: student.id });
    }
  },

  Book: {
    student: book => find(students, { id: book.studentId })
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false }
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
