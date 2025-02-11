import { logoutHandler } from "./auth";
import toast from "react-hot-toast";

const networkErrors = ["Failed to fetch", "Network Error", "401"];

export const catchErrors = (error, displayError) => {
  let errorMsg;
  // Conditionals

  if (networkErrors.includes(String(error))) {
    // 1. The request failed due to Network Issues
    errorMsg = "Network Error";
  } else if (error?.response?.data) {
    // 2A. The request went in but the server responded with a status code outside 2**
    errorMsg = error.response.data;

    // 2B. Cloudinary Image upload Error
    if (error?.response?.data?.error) errorMsg = error.response.data.error;
  } else if (error?.request) {
    // 3. The request went in but no response was received
    errorMsg = error.request;
  } else if (error?.response === 401) {
    logoutHandler();
  } else if (error?.response === 403) {
    logoutHandler();
  } else {
    // 4. Something else happened that resulted to an error
    errorMsg = error.message;
  }
  // Callback Handler to parent component so error messages can be propagated properly
  displayError && displayError(errorMsg);
};

export const notifyErrorHandler = ({ type, title, msg, duration }) => {
  let errorMsg = null;

  if (typeof msg === "object") {
    const message = JSON.parse(JSON.stringify(msg));

    if (message?.message === "Network Error") {
      errorMsg = "Network Error. Please check your internet connection";
    } else if (msg?.response?.status === 401) {
      logoutHandler();
      return;
    } else if (msg?.response?.status === 403) {
      logoutHandler();
      return;
    } else if (Object.entries(msg).length === 0) {
      errorMsg = String(msg);
      return;
    } else if (msg.response) {
      if (typeof msg?.response?.data === "string") {
        errorMsg = msg?.response?.data;
      }
      if (typeof msg?.response?.data !== "string") {
        errorMsg = Array.isArray(msg?.response?.data?.messages)
          ? msg?.response?.data?.messages[0]
          : "";
      }
    } else {
      errorMsg = String(msg);
    }
  }

  const toastConfig = {
    theme: type,
    title,
    active: true,
  };

  type === "success"
    ? toast.success(toastConfig.title)
    : type === "error"
    ? toast.error(toastConfig.title)
    : toast.loading(toastConfig.title);
};

export const resolveErrorMsg = (msg) => {
  let errorMsg = "Please check your network connection";
  let errorCode = null;

  if (typeof msg === "object" && Object.entries(msg).length === 0) {
    errorMsg = String(msg);
  }

  if (typeof msg === "object" && msg?.response) {
    if (typeof msg?.response?.data === "string") {
      errorMsg = msg?.response?.data;
      errorCode = msg.response.status;

      return { errorMsg, errorCode };
    }

    errorMsg =
      msg?.response?.data?.messages && msg?.response?.data?.messages[0]
        ? msg.response.data.messages[0]
        : "An error occurred. Please try again";
    errorCode = msg.response.status;
  }

  return { errorMsg, errorCode };
};

export const resolveSuccessMsg = (msg) => {
  let successMsg = "";

  if (msg) {
    successMsg = msg ?? "Successfull!";
  }

  return { successMsg };
};
