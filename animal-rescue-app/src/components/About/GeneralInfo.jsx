import { Box, Typography } from "@mui/material";

const heading = "NO KILL Animal Rescue";
const subheading = "Adopt, Don't shop!";
const email = "animaliscentrum@gmail.com";
const mobileNumber = "095 444 4210";
const address = "Ivana Pavla II 47A, 21212, Kaštel Sućurac";
const emailLabel = "E-mail";
const mobileNumberLabel = "Mob";
const addressLabel = "Adresa";

export default function GeneralInfo() {
  return (
    <>
      <Typography
        align="center"
        variant="h3"
        component="h1"
        sx={{ padding: 2 }}
      >
        {heading}
      </Typography>
      <Typography
        align="center"
        variant="h4"
        component="h2"
        sx={{ paddingBottom: 2 }}
      >
        {subheading}
      </Typography>
      <Box pb={4} pt={1}>
        <Typography align="center">
          {emailLabel}: {email}
        </Typography>
        <Typography align="center">
          {mobileNumberLabel}: {mobileNumber}
        </Typography>
        <Typography align="center">
          {addressLabel}: {address}
        </Typography>
      </Box>
    </>
  );
}
