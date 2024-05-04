import api, { setAuthToken } from "./index";

export async function getDonations() {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return (await api.get("/donations")).data;
}

export function deleteDonation(donationId) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return api.delete(`/donations/${donationId}`);
}

export function createDonation(donation) {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  setAuthToken(token);
  return api.post("/donations", { ...donation, userEmail: email });
}

export function updateDonation(donation) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return api.put(`/donations/${donation._id}`, donation);
}
