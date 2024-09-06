import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("@mobinc-token", token);
};

export const getToken = (decodeToken) => {
  const token = localStorage.getItem("@mobinc-token") ?? null;
  if (decodeToken) {
    if (token !== null) {
      const decryptedToken = jwtDecode(token);
      return decryptedToken;
    } else {
      return ;
    }
  }
  return token;
};

export const removeToken = () => {
  localStorage.removeItem("@mobinc-token");
};
