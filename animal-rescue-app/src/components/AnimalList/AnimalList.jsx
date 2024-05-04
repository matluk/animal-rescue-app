import { useState } from "react";
import { getAnimals } from "../../api/animals";
import AnimalCard from "./AnimalCard";
import { Box } from "@mui/material";
import AnimalListControls from "./AnimalListControls";
import AnimalEditDialog from "./AnimalEditDialog";
import { updateAnimal } from "../../api/animals";
import AppPagination from "../shared/AppPagination";

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [adoptionFilter, setAdoptionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [editDialog, setEditDialog] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);


  const visibleAnimals = animals;
  // const visibleAnimals = animals
  //   .filter(createFilterByAdoption(adoptionFilter))
  //   .filter(createFilterByType(typeFilter))
  //   .filter(createFilterByName(nameFilter));

  // useEffect(() => {
  //   getAnimals().then((animals) => setAnimals(animals));
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AnimalListControls
        setAdoptionFilter={setAdoptionFilter}
        setTypeFilter={setTypeFilter}
        setNameFilter={setNameFilter}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          pt: 4,
          pb: 4,
        }}
      >
        {visibleAnimals.length
          ? visibleAnimals.map((animal) => (
              <AnimalCard
                key={animal._id}
                {...animal}
                onAdopt={() =>
                  updateAnimal({ ...animal, isAdopted: true })
                    .then(getAnimals)
                    .then(setAnimals)
                    .then(() => setUpdateTrigger((prev) => !prev))
                    .then(() => setEditDialog(null))
                }
                onEdit={() => setEditDialog({ animal })}
              />
            ))
          : "No animals found"}
      </Box>
      <AnimalEditDialog
        animal={editDialog?.animal}
        onClose={() => setEditDialog(null)}
        onSubmit={(animal) =>
          updateAnimal(animal)
            .then(getAnimals)
            .then(setAnimals)
            .then(() => setUpdateTrigger((prev) => !prev))
            .then(() => setEditDialog(null))
        }
      />
      <AppPagination setAnimalsPage={(p) => setAnimals(p)} filters={{adoptionFilter, typeFilter, nameFilter}} updateTrigger={updateTrigger} />
    </Box>
  );
}
