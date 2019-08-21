export const resolvers = {
  Query: {
    newTrainee: async (_, __, { dataSources }) => {
      const res = await dataSources.TraineeAPI.getTrainee();
      return res;
    }
  }
};
