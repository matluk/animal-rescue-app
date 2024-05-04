import { Box, Typography } from "@mui/material";
import AnimalForm from "../shared/AnimalForm";
import { createAnimal } from "../../api/animals";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import { useContext, useEffect } from "react";
import { useAuth } from "../../utils/context/authContext";

const title = "Add a new animal";
const addAnimalLabel = "Add Animal";

export default function AnimalCreate() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    // If the user is not an admin, redirect to the animal list page
    if (!isAdmin) navigate(routes.animalList.path);
  }, [isAdmin, navigate]);

  const onSubmit = (animal) => {
    // after saving redirect to the animal list page
    createAnimal(animal).then(() => navigate(routes.animalList.path));
  };

  return (
    <Box sx={{ maxWidth: 750, margin: "16px auto" }}>
      <Typography mb={2} variant="h4">
        {title}
      </Typography>
      <AnimalForm submitButtonText={addAnimalLabel} onSubmit={onSubmit} />
    </Box>
  );
}
