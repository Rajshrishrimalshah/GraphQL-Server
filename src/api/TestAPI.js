import { RESTDataSource } from 'apollo-datasource-rest';

export class TestAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://express-training.herokuapp.com';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2NjE5OTU1OH0.qpj-PzdgZC2uKi_cUH4AXH3ZUIwVs5tCYwisUziuXmw');
  }

  traineeReducer(trainee) {
    return {
    id: trainee.originalId || 0,
    name: trainee.name,
    email: trainee.email,
    createdAt: trainee.createdAt,
    };
    }

  async getTrainee() {
    const response = await this.get('/api/user/me');
    return response.data;
  }
}
