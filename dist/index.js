"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
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
const typeDefs = apollo_server_1.gql `

type student {
  id: Int,
  firstName: String,
  lastName: String,
  college: String,
  married: Boolean
}

type Query {
  students: [student]
}
`;
const resolvers = {
    Query: {
        students: () => students
    }
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map