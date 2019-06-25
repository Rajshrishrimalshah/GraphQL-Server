export const resolvers = {
  Query: {
    newTrainee: (_, __, { dataSources }) =>
      dataSources.traineeAPI.getTrainee(),
  }
};
