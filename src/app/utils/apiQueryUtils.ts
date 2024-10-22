import errorConstants from "../constants/errors";
import user from "./userData";

type Errors = {
  [key: string]: string;
};

type queryMethods = "GET" | "POST";

const defaultErrorHandler = (err: Errors) => {
  console.log(err);
};

const fetchData = async (
  address: string,
  method: queryMethods,
  header: object = {},
  body: BodyInit | null | undefined,
  authorised: boolean = true
) => {
  const token = authorised ? user.getUserData()?.token : false;
  if ((token && authorised) || !authorised) {
    try {
      console.log({
        ...header,
        ...(authorised && token ? { Authorization: `Bearer ${token}` } : {}),
      })
      const params: {[key: string]: unknown} = {
        method: method,
        headers: {
          ...header,
          ...(authorised && token ? { Authorization: `Bearer ${token}` } : {}),
        }
      }
      if(body && method == "POST"){
        params.body = body ? body : ''
      }
      const response = await fetch(address, params);

      return response.json();
    } catch (error) {
      return {code: "error", message: error};
    }
  } else {
    throw new Error(errorConstants.NO_USER_TOKEN);
  }
};

export default {
  defaultErrorHandler,
  fetchData,
};
