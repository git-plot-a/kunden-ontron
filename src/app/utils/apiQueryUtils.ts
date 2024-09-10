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
  const token = user.getToken();
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
        //   ...(authorised && token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error: ", error);
      throw error;
    }
  } else {
    throw new Error(errorConstants.NO_USER_TOKEN);
  }
};

export default {
  defaultErrorHandler,
  fetchData,
};
