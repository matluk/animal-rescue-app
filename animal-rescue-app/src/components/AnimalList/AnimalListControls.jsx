import { Box, FormLabel } from "@mui/material";
import BaseRadioGroup from "../shared/base/BaseRadioGroup";
import { useForm } from "react-hook-form";
import { supportedPetTypes, adoptionStates } from "../../utils/animal";
import { useEffect } from "react";
import BaseTextField from "../shared/base/BaseTextField";

const typeOfPetLabel = "Type of Pet";
const adoptionLabel = "Adoption Status";

export default function AnimalListControls({
  setAdoptionFilter,
  setTypeFilter,
  setNameFilter,
}) {
  const { control, watch } = useForm({
    defaultValues: { type: "all", adoption: "all", name: "" },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      //console.log(value, name, type);
      if (type === "change" && name == "type") {
        setTypeFilter(value.type);
      }

      if (type === "change" && name == "adoption") {
        setAdoptionFilter(value.adoption);
      }

      if (type === "change" && name == "name") {
        setNameFilter(value.name);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setTypeFilter, setAdoptionFilter, setNameFilter]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        overflow: "auto",
        pt: 2,
        gap: 4,
      }}
    >
      <Box
        sx={{
          minWidth: 310,
          maxWidth: 310,
          height: 102,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          paddingRight: '15px',
        }}
      >
        <FormLabel>Name</FormLabel>
        <BaseTextField
          name="name"
          control={control}
          muiProps={{ InputLabelProps: { shrink: true }, variant: "standard" }}
        />
      </Box>

      <BaseRadioGroup
        name="type"
        control={control}
        label={typeOfPetLabel}
        radioButtons={[{ label: "All", value: "all" }, ...supportedPetTypes]}
        formControlStyles={{ minWidth: 310 }}
      />

      <BaseRadioGroup
        name="adoption"
        control={control}
        label={adoptionLabel}
        radioButtons={[{ label: "All", value: "all" }, ...adoptionStates]}
        formControlStyles={{ minWidth: 310 }}
      />
    </Box>
  );
}
