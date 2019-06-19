// author.js
export const typeDef = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;

export const resolvers = {
  Author: {
    books: () => { return console.log(' AUTHOR RESOLVER IS CALLED') },
  }
};
