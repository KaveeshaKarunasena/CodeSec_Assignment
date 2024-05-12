import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import axios from "axios";
import signupLogo from "../../assets/cook_logo.png";
import { useNavigate, NavLink } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showOtpForm, setShowOtpForm] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      !data.get("firstName") ||
      !data.get("lastName") ||
      !data.get("email") ||
      !data.get("phoneNumber") ||
      !data.get("password") ||
      !data.get("confirmPassword")
    ) {
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

    if (data.get("password") !== data.get("confirmPassword")) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    setUserData({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    });

    try {
      await axios.post("http://localhost:8080/api/v1/users/sendOtp", {
        email: data.get("email"),
      });
      setShowOtpForm(true);
    } catch (err) {
      enqueueSnackbar(err.response.data.err, { variant: "error" });
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!otp) {
      enqueueSnackbar("OTP is required", { variant: "error" });
      return;
    }

    try {
      await axios
        .post("http://localhost:8080/api/v1/users/verifyOTP", {
          email: userData.email,
          code: otp,
        })
        .then(async (res) => {
          enqueueSnackbar("Otp verified", { variant: "success" });
          console.log(userData)
          await axios
            .post("http://localhost:8080/api/v1/users/createAccount", {
              fname: userData.firstName,
              lname: userData.lastName,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
              password: userData.password,
              email_token: res.data,
            })
            .then(navigate("/"))
            .catch((err) =>
              enqueueSnackbar(err.response.data.err, { variant: "error" })
            );
        })
        .catch((err) =>
          enqueueSnackbar(err.response.data.err, { variant: "error" })
        );
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.response.data.err, { variant: "error" });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={signupLogo}
          alt="Login"
          style={{ width: "5%", height: "auto" }}
        />
      </Box>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          {!showOtpForm ? (
        <Box>
          <Typography component="h1" variant="h5" align="left">
            Register
          </Typography>
          
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
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
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  paddingTop: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FE5E7F",
                    "&:hover": {
                      backgroundColor: "#FE5E7F",
                    },
                    borderRadius: 0,
                    fontSize: "bold",
                    height: 35,
                  }}
                >
                  Create Account
                </Button>
              </Box>
              <Grid container justifyContent="center" sx={{ paddingTop: 3 }}>
                <Grid item>
                  <NavLink
                    to="/"
                    variant="body2"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Already have an account?{" "}
                    <span style={{ color: "#FE5E7F" }}>Log In</span>
                  </NavLink>
                </Grid>
              </Grid>
              </Box>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", marginLeft: 10, paddingTop:10 }}>
              <Box
                component="form"
                noValidate
                onSubmit={handleOtpSubmit}
                sx={{ mt: 1, width: "100%", maxWidth: 400 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  InputProps={{ sx: { borderRadius: 4 } }}
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
                    borderRadius: 4,
                    fontSize: "bold",
                    height: 35,
                  }}
                >
                  Verify OTP
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
