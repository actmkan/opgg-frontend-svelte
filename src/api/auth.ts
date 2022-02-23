import request from "./request";

export const login = (email, password) => {
  return request.post("/auth/login", {
    email,
    password,
  });
};

export const logout = () => {
  return request.get("/auth/logout");
};
