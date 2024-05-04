import format from 'date-fns/format';

export const adoptedType = "adopted";
export const unadoptedType = "unadopted";

export const dogType = "dog";
export const catType = "cat";
export const otherType = "other";

export const initAnimal = () => ({
  name: "",
  description: "",
  type: "",
  isChipped: false,
  isAdopted: false,
  age: "",
  image: "",
  lastExaminatedAt: "",
});

export const supportedPetTypes = [
  { value: dogType, label: "Dog" },
  { value: catType, label: "Cat" },
  { value: otherType, label: "Other" },
];

export const adoptionStates = [
  { value: adoptedType, label: "Adopted" },
  { value: unadoptedType, label: "Unadopted" },
];

export const createFilterByAdoption = (adoptionFilter) => {
  return (animal) => {
    if (adoptionFilter === "all") return true;
    if (adoptionFilter === adoptedType) return animal.isAdopted;
    if (adoptionFilter === unadoptedType) return !animal.isAdopted;
  };
};

export const createFilterByType = (typeFilter) => {
  return (animal) => {
    if (typeFilter === "all") return true;
    if (typeFilter === dogType) return animal.type === dogType;
    if (typeFilter === catType) return animal.type === catType;
    if (typeFilter === otherType)
      return animal.type !== dogType && animal.type !== catType;
  };
};

export const createFilterByName = (nameFilter) => {
  return (animal) => {
    if (!nameFilter) {
      return true;
    }

    return animal.name.toLowerCase().includes(nameFilter.toLowerCase());
  };
};

export const serializeAnimal = (data) => {
  // tranforms form data into a format that can be sent to the server
  return {
    ...data,
    age: parseInt(data.age, 10),
    image: data.image || '',
    lastExaminatedAt: data.lastExaminatedAt
      ? new Date(data.lastExaminatedAt).getTime()
      : '',
  };
};

export const deserializeAnimal = (animal) => {
  return {
    ...animal,
    lastExaminatedAt: animal.lastExaminatedAt ? format(new Date(animal.lastExaminatedAt), 'yyyy-MM-dd') : '',
  };
};
