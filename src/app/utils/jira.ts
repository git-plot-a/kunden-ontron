import constants from "../constants/global";
import errors from "../constants/errors";


interface ApiRequestData {
  type?: string;
  summary?: string;
  description?: string;
  userEmail?: string;
}



const apiRequest = async (data: ApiRequestData = {}, method = "POST") => {
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  try {
    let url = "/api/jira";
    const options: RequestInit = {
      method,
      headers,
    };

    if (method === "POST") {
      options.body = JSON.stringify(data);
    } else if (method === "GET" && data.userEmail) {
      url += `?userEmail=${encodeURIComponent(data.userEmail)}`;
    }

    const response = await fetch(url, options);
    // return response;
    if (!response.ok) {
      console.error(`${errors.JIRA_ERROR_MISTAKE}${response.statusText}`);
      return {
        status: "400",
        message: `${errors.JIRA_ERROR_MISTAKE}${response.statusText}`,
      };
    }

    console.log(constants.JIRA_SERVER_RESPONCE, response.body)
    const result = await response.json();
    console.log(constants.JIRA_SERVER_RESPONCE, result);
    return result;
  } catch (error) {
    console.error(errors.JIRA_ERROR_RESPONSE, error);
    return error;
  }
};


export default {
  apiRequest,
};
