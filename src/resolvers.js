import fetch from "node-fetch";
import { PubSub } from "apollo-server";

const user_Added = "USER_ADDED";
const user_Deleted = "USER_DELETED";
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    randomPerson: async () => {
      const response = await fetch("https://api.randomuser.me/");
      const data = await response.json();
      return data.results;
    },
    getPerson: (_, __, { dataSources }) => {
      return dataSources.randomUserAPI.getPerson();
    },
    getTraineeFetch: async () => {
      const response = await fetch(
        "https://express-training.herokuapp.com/api/user/me",
        {
          method: "GET",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2MTQ2MDcyN30.vErXlgx_p7hnd4EAr3wjCY039Yz8wYUNXVxlxu2ECik"
          }
        }
      );
      const res = await response.json();
      return res.data;
    },
    getTrainee: (_, __, { dataSources }) => {
      return dataSources.trainee.getTrainee();
    },
    getTraineeDetail: async (_, { limit, skip }, { dataSources }) => {
      return await dataSources.trainee.getTraineeDetails(limit, skip);
    }
  },

  Mutation: {
    createTrainee: async (_, { name, email, password }, { dataSources }) => {
      const res = dataSources.trainee.createTrainee(name, email, password);
      pubsub.publish(user_Added, { userCreated: res });
      return res;
    },
    updateTrainee: (_, { id, name, email }, { dataSources }) => {
      return dataSources.trainee.updateTrainee(id, name, email);
    },
    deleteTrainee: (_, { id }, { dataSources }) => {
      const res = dataSources.trainee.deleteTrainee(id);
      pubsub.publish(user_Deleted, { userDeleted: res });
      return res;
    }
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([user_Added])
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator([user_Deleted])
    }
  }
};
