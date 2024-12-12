import { useState } from "react";
import constants from "./constants";

const useLoadContent = () => {
  const [generalError, setGeneralError] = useState("");

  const temporaryLoadFile = (file, onLoadCallback) => {
    if (file) {
      if (!checkFileSize) return false;
      var reader = new FileReader();
      reader.onload = onLoadCallback;
      reader.readAsDataURL(file);
      setGeneralError("");
      return true;
    }
    setGeneralError(constants.FILE_NOT_FOULD);
    return false;
  };

  const prossessFileLoading = (file, callback) => {
    const onLoadCallback = (e) => {
      try {
        callback(e);
      } catch (error) {
        console.log(error);
        setGeneralError(constants.IMPOSSIBLE_TO_FIRE_ONLOAD_FUNCTION);
      }
    };

    return temporaryLoadFile(file, onLoadCallback);
  };

  const checkContentMemoryValue = (value) => {
    try {
      const size = new Blob([String(value)]).size;
      console.log(size);
      if (size > constants.MAX_LOADING_SIZE) {
        setGeneralError(constants.TOO_BIG_CONTENT);
        return false;
      }
      return true;
    } catch (err) {
      setGeneralError(constants.IMPOSSIBLE_TO_CHECK_CONTENT_MEMORY_VALUE);
      return false;
    }
  };

  const checkFileSize = (file, errorText = false) => {
    if (!file.size || file.size && file.size > constants.MAX_LOADING_SIZE) {
      console.log(file)
      setGeneralError(errorText ? errorText : constants.TOO_BIG_FILE);
      return false;
    }
    return true;
  };

  return {
    prossessFileLoading,
    generalError,
    checkContentMemoryValue,
    checkFileSize,
    setGeneralError
  };
};

export default useLoadContent;
