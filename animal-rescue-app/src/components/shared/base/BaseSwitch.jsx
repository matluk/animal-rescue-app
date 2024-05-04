import { FormControlLabel, Switch } from "@mui/material";
import { Controller } from "react-hook-form";

export default function BaseSwitch({ control, name, label }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel label={label} control={<Switch checked={field.value} {...field} />} />
      )}
    />
  );
}
