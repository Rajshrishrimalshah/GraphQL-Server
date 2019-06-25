import { RESTDataSource } from "apollo-datasource-rest";

export class Trainee extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = " https://express-training.herokuapp.com/";
  }

  willSendRequest(request) {
    request.headers.set(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2MTQ2MDcyN30.vErXlgx_p7hnd4EAr3wjCY039Yz8wYUNXVxlxu2ECik"
    );
  }

  async getTrainee() {
    const response = await this.get("api/user/me");
    return response.data;
  }

  async getTraineeDetails() {
    const response = await this.get("/api/trainee", {
      limit: 5,
      skip: 100
    });

    const res = response.data.records;
    return res;
  }

  async createTrainee() {
    const user = {
      name: "Raj",
      email: "RAJ@GMAIL.COM",
      password: "RAJ@GMAIL.COM"
    };
    const { name, email, password } = user;
    const response = await this.post("/api/trainee", {
    name, email, password
    });
    const res = response.message;
    return res;
  }
}
