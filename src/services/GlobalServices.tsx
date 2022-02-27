import { IRegisterObject } from "../types/types";
import ApiService from "./ApiService";

export default class GlobalServices extends ApiService {
  static async signup(obj: IRegisterObject): Promise<any> {
    return await this.request("POST", "register", obj);
  }
}
