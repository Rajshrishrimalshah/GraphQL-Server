import { RESTDataSource } from 'apollo-datasource-rest';

export class TestAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://express-training.herokuapp.com';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2MTQzNzM3M30.qhXsN2G4M-iFy8Byl67i2ZX3MStQvyqajLFVcj81UXM');
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
    return this.traineeReducer(response.data);
  }
}
