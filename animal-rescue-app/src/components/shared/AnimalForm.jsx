import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import BaseTextField from "../shared/base/BaseTextField";
import BaseSwitch from "../shared/base/BaseSwitch";
import BaseRadioGroup from "../shared/base/BaseRadioGroup";
import {
  initAnimal,
  supportedPetTypes,
  serializeAnimal,
  deserializeAnimal,
} from "../../utils/animal";

export default function AnimalForm({
  submitButtonText,
  onSubmit,
  editedAnimal,
}) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    // initialize the form with the values of the edited animal or with the empty animal
    defaultValues: editedAnimal
      ? deserializeAnimal(editedAnimal)
      : initAnimal(),
  });

  const submitCallback = (data) => {
    onSubmit(serializeAnimal(data));
  };

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <BaseTextField
          name="name"
          control={control}
          rules={{ required: true }}
          muiProps={{ label: "Name" }}
          hasError={!!errors.name}
          helperText={errors.name ? "Name is required" : " "}
        />

        <BaseTextField
          name="description"
          control={control}
          muiProps={{ label: "Description", multiline: true, rows: 3 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BaseRadioGroup
            name="type"
            control={control}
            label="Type"
            radioButtons={supportedPetTypes}
            hasError={!!errors.type}
            helperText={errors.type ? "Type is required" : " "}
          />

          <BaseSwitch name="isChipped" control={control} label="Chipped" />

          <BaseSwitch name="isAdopted" control={control} label="Adopted" />
        </Box>

        <BaseTextField
          name="age"
          control={control}
          rules={{ required: true, number: true }}
          muiProps={{ label: "Age", type: "number" }}
          hasError={!!errors.age}
          helperText={errors.age ? "Age is a required number" : " "}
        />

        <BaseTextField
          name="image"
          control={control}
          muiProps={{ label: "Image" }}
          helperText=" "
        />

        <BaseTextField
          name="lastExaminatedAt"
          control={control}
          muiProps={{
            label: "Last Examinated At",
            type: "date",
            InputLabelProps: { shrink: true },
          }}
          helperText=" "
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            {submitButtonText}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
