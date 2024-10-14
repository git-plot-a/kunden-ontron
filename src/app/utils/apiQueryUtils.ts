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
  body: BodyInit | null | undefined,
  authorised: boolean = true
) => {
  const token = authorised ? user.getUserData()?.token : false;
  if ((token && authorised) || !authorised) {
    try {
      const response = await fetch(address, {
        method: method,
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        //   "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        //   "Pragma": "0"
        //   Pragma: "no-cache",
        //   Expires: "0",
          ...(authorised && token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body,
      });
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
