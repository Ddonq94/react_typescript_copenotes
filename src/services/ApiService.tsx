export default class ApiService {
  protected static getApiUrl(): string {
    return "http://localhost:3500/api/v1";
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
    const response = await fetch(`${this.getApiUrl()}/${path}`, {
      method: method,
      headers: Object.assign(
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        headers
      ),
      body: data ? JSON.stringify(data) : null,
    });

    let responseData;

    try {
      responseData = await response.json();
    } catch (err) {
      responseData = null;
    }

    if (!response.ok) {
      throw new Error(responseData?.err || response.statusText);
    }

    return responseData;
  }
}
