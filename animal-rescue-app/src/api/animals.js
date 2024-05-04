import api, { setAuthToken } from "./index";

export async function getAnimals() {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return (await api.get("/animals")).data;
}

export function createAnimal(animal) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return api.post("/animals", animal);
}

export function updateAnimal(animal) {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  setAuthToken(token);
  return api.put(`/animals/${animal._id}`, {...animal, userEmail:email});
}
