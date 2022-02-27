export default class ApiService {
  protected static getApiUrl(): string {
    return "";
  }

  /**
   * Send request to backend
   */
  protected static async request(
    method: string,
    path: string,
    data?: any,
    headers?: any
  ): Promise<any> {
    console.log(data, method);

    // incase of actual REST API
    // const response = await fetch(`${this.getApiUrl()}/${path}`, {
    //   method: method,
    //   headers: Object.assign(
    //     {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     headers
    //   ),
    //   body: data ? JSON.stringify(data) : null,
    // });
  }
}
