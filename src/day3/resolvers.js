import { PubSub, withFilter } from "apollo-server-express";

const user_Added = "USER_ADDED";
const user_Updated = "USER_UPDATED";
const new_User_Added = "NEW_USER_ADDED";
const pubsub = new PubSub();

let id = 2;

let users = [
  { id: 1, username: "Test" },
  { id: 2, username: "Test" },
  { id: 3, username: "Test" },
  { id: 4, username: "Test" },
  { id: 5, username: "Test" },
  { id: 6, username: "Test" },
  { id: 7, username: "Test" }
];

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
    async createUser(parent, { username }) {
      let user = { id, username, age: 21 };
    //  console.log(`${id} and ${username}`);
      users = [...users, user];
      await pubsub.publish(user_Added, { userAdded: user });
      await pubsub.publish(new_User_Added, {
        newUserAdded: user
      });
      id++;
      return user;
    },

    deleteUser: (parent, { id }) => {
      let temp = {};
      let i=1
      users = users.filter(user => {
        if (user.id !== id) {
          return user;
        }
        console.log(user)
        temp = user;
      });
      return temp;
    },

    async updateUser(parent, { id, username }) {
      let userData = { id, username };
      users.map(user => {
        if (user.id === id) {
          user.id = id;
          user.username = username;
        }
      });
      await pubsub.publish(user_Updated, {
        userUpdated: userData
      });
      return userData;
    }
  },

  //subscribe: () => pubsub.asyncIterator(user_Added)
  Subscription: {
    userAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(user_Added),
        (payload, variables) => {
          return payload.userAdded.id === variables.id;
        }
      )
    },
    newUserAdded: {
      subscribe: () => pubsub.asyncIterator(new_User_Added)
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator(user_Updated)
    }
  }
};
