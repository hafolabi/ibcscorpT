import Cookies from "js-cookie";

export const clearCacheHandler = () => {
  Cookies.remove("ABCD");
};

export const logoutHandler = async () => {
  clearCacheHandler();
  window.location = "/";
};
