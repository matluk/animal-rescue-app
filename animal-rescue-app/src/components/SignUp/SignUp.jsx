import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../../api/user";
import { Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        Animal Rescue App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [emailInUseError, setEmailInUseError] = React.useState(false);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      setRegistrationSuccess(true);
      //console.log("User registered successfully:", data);
      
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.err.includes("duplicate")) {
        setEmailInUseError(true);

        setTimeout(() => {
          setEmailInUseError(false);
        }, 3000);
      } else {
        setEmailInUseError(false);
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {registrationSuccess && (
          <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
            Successfully registered!
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="username"
                defaultValue=""
                control={control}
                rules={{ required: true, minLength: 3 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="given-name"
                    fullWidth
                    id="userName"
                    label="First Name"
                    autoFocus
                    error={!!errors.username}
                    helperText={
                      errors.username
                        ? "Username is required (min length 3)"
                        : " "
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={
                      errors.email ? (
                        "Invalid email address"
                      ) : emailInUseError ? (
                        <span style={{ color: "red" }}>
                          Email is already in use
                        </span>
                      ) : (
                        "Enter your email address"
                      )
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{ required: true, minLength: 3 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    id="password"
                    label="Password"
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={
                      errors.password
                        ? "Password is required (min length 3)"
                        : " "
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="role"
                    control={control}
                    defaultValue="user"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        value="admin"
                        checked={field.value === "admin"}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? "admin" : "user")
                        }
                      />
                    )}
                  />
                }
                label="Admin role"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
