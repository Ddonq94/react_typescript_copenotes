export default class ApiService {
  protected static getApiUrl(): string {
    // return "http://127.0.0.1:8001/api";
    // return "http://127.0.0.1:8000/api";
    return "https://pkbsolutions.com/fsms/public/api";
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
    let responseData;

    console.log(data, method);

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

    let resJson = await response.json();

    console.log(resJson);

    // console.log(response.json());

    // if (response.status === 401) {
    //   window.location.href = `${AUTH_APP_URL}/?redirectTo=${encodeURIComponent(
    //     window.location.href
    //   )}`;
    // }

    // try {
    //   responseData = await response;
    // } catch (err) {
    // console.log(err);
    // setHandle(true);
    // setType("error");
    // setMsg("Something Broke, Please try again or contact Admin");
    //   console.log(err);

    //   responseData = null;
    // }

    if (response.ok) {
      console.log(await response, 1);
      responseData = { res: "success", json: resJson };
    }

    if (!response.ok) {
      console.log(await response, 2);
      responseData = { res: "error", json: resJson };
    }

    return responseData;
  }
}
