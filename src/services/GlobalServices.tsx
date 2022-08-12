import ApiService from "./ApiService";

export default class GlobalServices extends ApiService {
  static async signup(obj: any): Promise<any> {
    return await this.request("POST", "users", obj);
  }

  static async getUsers(): Promise<any> {
    return await this.request("GET", "users");
  }
}
