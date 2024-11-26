import errors from "../constants/errors";

interface ApiRequestData {
  type?: string;
  summary?: string;
  description?: string;
  userEmail?: string;
  project?: {
    name: string;
    id: string | number;
  };
  fields?: string;
}

const apiRequest = async (data: ApiRequestData = {}, method = "POST") => {
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Cache-Control": "no-cache",
  };

  try {
    let url = "/api/jira";
    const options: RequestInit = {
      method,
      headers,
    };

    if (method === "POST") {
      options.body = JSON.stringify(data);
    } else if (method === "GET") {
      if (data.userEmail) {
        url += `?userEmail=${encodeURIComponent(data.userEmail)}&project=${
          data.project?.name
        }`;
      }
      if (data.project?.id) {
        url += `?project=${data.project?.name}`;
      }
      if (data.fields) {
        url += `&fields=${data.fields}`;
      }
    }
    console.log(url);
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(`${errors.JIRA_ERROR_MISTAKE}${response.statusText}`);
      return {
        status: "400",
        message: `${errors.JIRA_ERROR_MISTAKE}${response.statusText}`,
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(errors.JIRA_ERROR_RESPONSE, error);
    return error;
  }
};

export default {
  apiRequest,
};
