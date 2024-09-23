import constants from "../constants/global";
import errors from "../constants/errors";

const apiRequest = async (data: object) => {

  try {
    const headers = {
      "Content-Type": "application/json",
      'X-Requested-With': 'XMLHttpRequest',
    };
    console.log(data)

    const response = await fetch('/api/jira', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`${errors.JIRA_ERROR_MISTAKE}${response.statusText}`);
      return {
        status: "400",
        message: `${errors.JIRA_ERROR_MISTAKE}${response.statusText}`,
      };
    }

    const result = await response;
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