import api, { setAuthToken } from "./index";

export async function getNotifications() {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return (await api.get("/notifications")).data;
}

export function createNotification(notification) {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  setAuthToken(token);
  return api.post("/notifications", { ...notification, userEmail:email });
}

export function deleteNotification(id) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return api.delete(`/notifications/${id}`);
}
