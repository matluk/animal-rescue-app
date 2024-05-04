import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import BaseTextField from "../shared/base/BaseTextField";
import BaseSwitch from "../shared/base/BaseSwitch";

export default function DonationForm({ onSubmit, showIsImportantSwitch }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isImportant: false,
    },
  });

  const submitCallback = (data) => {
    onSubmit({ ...data, createdAt: Date.now() });
  };

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <BaseTextField
          name="title"
          control={control}
          rules={{ required: true, maxLength: 20 }}
          muiProps={{ label: "Title" }}
          hasError={!!errors.title}
          helperText={
            errors.title ? "Title is required (max 20 characters)" : " "
          }
        />

        <BaseTextField
          name="description"
          control={control}
          rules={{ required: true, minLength: 10, maxLength: 200 }}
          muiProps={{ label: "Description", multiline: true, rows: 3 }}
          hasError={!!errors.description}
          helperText={
            errors.description
              ? "Description is required (min 10, max 200 characters)"
              : " "
          }
        />

        {showIsImportantSwitch && (
          <BaseSwitch name="isImportant" control={control} label="Important" />
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
}
