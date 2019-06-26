import { RESTDataSource } from "apollo-datasource-rest";

export class Trainee extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = " https://express-training.herokuapp.com/";
  }

  willSendRequest(request) {
    request.headers.set(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2MTUyMjIzNX0.UPvEcRKtpS04xdgwZRRx2cwHiayKLcyrG3ZqAr0wqxk"
    );
  }

  async getTrainee() {
    const response = await this.get("api/user/me");
    return response.data;
  }

  async getTraineeDetails(limit = 50, skip = 200) {
    const response = await this.get("/api/trainee", {
      limit,
      skip
    });

    const res = response.data.records;
    return res;
  }

  async createTrainee(name, email, password) {
    const response = await this.post("/api/trainee", {
      name,
      email,
      password
    });

    return response;
  }

  async updateTrainee(id, name, email) {
    const response = await this.put("/api/trainee", {
      id,
      name,
      email
    });

    return response;
  }

  async deleteTrainee(id) {
    const response = await this.delete(`/api/trainee/${id}`);

    return response;
  }
}
