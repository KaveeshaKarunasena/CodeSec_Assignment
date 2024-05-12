import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { AuthContext } from "../../auth/AuthProvide";
import loginImage from "../../assets/cook_logo.png";

const defaultTheme = createTheme();

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email") || !data.get("password")) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.get("email"))) {
      enqueueSnackbar("Invalid email format. Please use a Gmail address", {
        variant: "error",
      });
      return;
    }

    if (data.get("password").length < 8) {
      enqueueSnackbar("Password must be at least 8 characters long", {
        variant: "error",
      });
      return;
    }
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/api/v1/users/login",
        data: { email: data.get("email"), password: data.get("password") },
      });

      console.log(res.data);
      login(res.data);
      navigate("/user/home");
    } catch (err) {
      enqueueSnackbar(err.response.data.err, { variant: "error" });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <img
                src={loginImage}
                alt="Login"
                style={{ maxWidth: "17%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography component="h1" variant="h5" align="left">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputProps={{ sx: { borderRadius: 0 } }}
                  sx={{
                    "& label.Mui-focused": {
                      color: "#FE5E7F",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#FE5E7F",
                      },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{ sx: { borderRadius: 0 } }}
                  sx={{
                    "& label.Mui-focused": {
                      color: "#FE5E7F",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#FE5E7F",
                      },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#FE5E7F",
                    "&:hover": {
                      backgroundColor: "#FE5E7F",
                    },
                    mt: 3,
                    mb: 2,
                    borderColor: "primary.main",
                  }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Link href="/reset/password" variant="body2" color="#FE5E7F" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {"Don't have an account? "}
                      <span style={{ color: "#FE5E7F" }}>
                        Create an account
                      </span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
