import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import AnimalForm from "../shared/AnimalForm";

export default function AnimalEditDialog({ animal, onClose, onSubmit }) {
  return (
    <Dialog open={!!animal} onClose={onClose}>
      <DialogTitle>
        Editing {animal?.name} (ID: {animal?._id})
      </DialogTitle>
      <DialogContent>
        <AnimalForm
          submitButtonText="Save"
          editedAnimal={animal}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
