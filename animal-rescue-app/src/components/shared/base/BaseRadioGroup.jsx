import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function BaseRadioGroup({
  radioButtons,
  helperText,
  control,
  label,
  name,
  hasError,
  formControlStyles
}) {
  return (
    <FormControl error={hasError} sx={formControlStyles}>
      <FormLabel>{label}</FormLabel>
      <Controller
        rules={{ required: true }}
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup name={name} row {...field}>
            {radioButtons.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>
        )}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}