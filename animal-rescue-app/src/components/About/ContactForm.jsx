import { FormControl, TextField, Typography, Button } from "@mui/material";

const sendUsMessageLabel = "Send us a message";

export default function GeneralInfo() {
  return (
    <>
      <Typography variant="h5" component="h5" mt={4}>
        {sendUsMessageLabel}
      </Typography>
      <FormControl sx={{ maxWidth: 700, width: "100%", pt: 2, pb: 4 }}>
        <TextField id="email" label="Email" variant="outlined" sx={{ pb: 2 }} />
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          multiline
          rows={10}
        />
      </FormControl>
      <Button variant="contained" sx={{ mb: 10 }}>
        Submit
      </Button>
    </>
  );
}
