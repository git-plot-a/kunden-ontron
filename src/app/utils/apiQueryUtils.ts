// import utils from ".";
// import errorConstants from "../constants/errors";

// //TODO: Set correct error handler
// type Errors = {
// [key: string]: string
// }
// const defaultErrorHandler = (err: Errors) => {
//   console.log(err);
// };

// const getData = async (
//   axiosType : any,
//   address: string,
//   // stateFunction: void,
//   headers = {},
//   errorHandler = defaultErrorHandler
// ) => {
//   try {
//     const response = await axiosType.get(address, headers);
//     if (response && response.data) {
//       // stateFunction(response.data);
//       return;
//     }
//     // errorHandler(errorConstants.EMPTY_ANSWER );
//     throw new Error(errorConstants.EMPTY_ANSWER);
//   } catch (err) {
//     console.log(err)
//     if (err.response) {
//       if (err.response.status == "401" || err.response.status == "403") {
//         utils.user.resetToken();
//         window.location.reload();
//       }
//       errorHandler(err);
//     } else {
//       errorHandler(`Error ${err.message}`);
//     }
//   }
// };

// const postData = async (
//   axiosType,
//   address,
//   stateFunction,
//   data = {},
//   headers = {},
//   errorHandler = defaultErrorHandler
// ) => {
//   try {
//     const response = await axiosType.post(address, data, headers);
//     if (response && response.data) {
//       stateFunction(response.data);
//       return;
//     }
//     throw new Error(errorConstants.EMPTY_ANSWER);
//   } catch (err) {
//     if (err.response) {
//       if (err.response.status == "401" || err.response.status == "403") {
//         utils.user.resetToken();
//         window.location.reload();
//       }
//       errorHandler(err.response.data.message);
//     } else {
//       errorHandler(`Error ${err.message}`);
//     }
//     return;
//   }
// };

// export default {
//   defaultErrorHandler,
//   getData,
//   postData,
// };


export default {}