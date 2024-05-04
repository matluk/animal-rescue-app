import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import BaseTextField from "../shared/base/BaseTextField";
import BaseRadioGroup from "../shared/base/BaseRadioGroup";
import { supportedTypes } from "../../utils/donation.js";

export default function DonationForm({ onSubmit }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      value: "",
    },
  });

  const submitCallback = (data) => {
    onSubmit({ ...data, value: parseInt(data.value) });
  };

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <BaseRadioGroup
          name="type"
          control={control}
          label="Type"
          radioButtons={supportedTypes}
          hasError={!!errors.type}
          helperText={errors.type ? "Type is required" : " "}
        />

        <BaseTextField
          name="value"
          control={control}
          rules={{ required: true, number: true }}
          muiProps={{ label: "Value (USD)", type: "number" }}
          hasError={!!errors.value}
          helperText={errors.value ? "Value is a required number" : " "}
        />

        <BaseTextField
          name="description"
          control={control}
          muiProps={{ label: "Description", multiline: true, rows: 3 }}
          helperText=" "
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
}
