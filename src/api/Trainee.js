import { RESTDataSource } from 'apollo-datasource-rest';

export class TraineeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://express-training.herokuapp.com';
  }


  willSendRequest(request) {
    request.headers.set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2MTQzNzM3M30.qhXsN2G4M-iFy8Byl67i2ZX3MStQvyqajLFVcj81UXM');
  }

  async getTrainee() {
    const response = await this.get('/api/user/me');
    return response.data;
  }
}
