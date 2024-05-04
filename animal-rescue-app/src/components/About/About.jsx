import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LeafletMap from "./LeafletMap";
import GeneralInfo from "./GeneralInfo";
import ContactForm from "./ContactForm";
import { useAuth } from "../../utils/context/authContext";

export default function About() {
  const { isAuthenticated } = useAuth();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ width: "100%", textAlign: "center", pt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to NO KILL Animal Rescue
        </Typography>
        <Typography variant="body1" paragraph>
          We believe every animal deserves a loving home. Join us in our mission
          to save lives and find forever homes for animals in need.
        </Typography>
        {!isAuthenticated && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2,
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/signin"
              sx={{
                mr: 2,
                fontFamily: "Arial",
                fontWeight: "bold",
                width: "200px",
                padding: "10px 20px",
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/signup"
              sx={{
                fontFamily: "Arial",
                fontWeight: "bold",
                width: "200px",
                padding: "10px 20px",
                bgcolor: "#4CAF50",
                "&:hover": {
                  bgcolor: "#45a049",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
      <GeneralInfo />
      <LeafletMap />
      <ContactForm />
    </Box>
  );
}
