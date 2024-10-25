import { useRouter } from "next/navigation"
import errorConstants from "../../constants/errors";
import utils from "@/app/utils";

type Errors = {
  [key: string]: string;
};

type queryMethods = "GET" | "POST";

const useSendQuery = () => {
  const router = useRouter()

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
    const token = authorised ? utils.user.getUserData()?.token : false;
    if ((token && authorised) || !authorised) {
      try {
        const params: { [key: string]: unknown } = {
          method: method,
          headers: {
            ...header,
            ...(authorised && token ? { Authorization: `Bearer ${token}` } : {}),
          }
        }
        if (body && method == "POST") {
          params.body = body ? body : ''
        }
        const response = await fetch(address, params);

        if (response.status === 403) {
          utils.user.resetAllData()
          router.push('/login')
        }
  
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        return response.json();
      } catch (error) {
        return { code: "error", message: error };
      }
    } else {
      throw new Error(errorConstants.NO_USER_TOKEN);
    }
  };

  return {
    defaultErrorHandler,
    fetchData,
  };

}

export default useSendQuery