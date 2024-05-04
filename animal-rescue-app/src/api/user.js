import api, { setAuthToken } from "./index";

export function registerUser(user) {
  return api.post("/register", user);
}

export function loginUser(user) {
  return api.post("/login", user);
}
