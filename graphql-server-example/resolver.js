export const resolvers = {
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
    createUser: (parent, { id, username }) => {
      let user = { id, username };
      users = [...users, user];
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

    updateUser: (parent, { id, username }) => {
      let user = { id, username };

      let index = users.findIndex(x => x.id === id);
      users[index] = user;

      return user;
    }
  }
};
