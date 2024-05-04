import { getAnimals } from "../api/animals";

import {
  createFilterByAdoption,
  createFilterByType,
  createFilterByName,
} from "./animal";

const service = {
  getData: async ({ from, to }, filters) => {

    const animals = await getAnimals();

    const filteredAnimals = animals
      .filter(createFilterByAdoption(filters.adoptionFilter))
      .filter(createFilterByType(filters.typeFilter))
      .filter(createFilterByName(filters.nameFilter));

    const data = filteredAnimals.slice(from, to);

    return { count: filteredAnimals.length, from, to, data: data };
  },
};

export default service;
