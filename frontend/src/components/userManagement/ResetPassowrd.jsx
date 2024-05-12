import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import signupLogo from "../../assets/cook_logo.png";

export function ResetPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [showOtpForm, setShowOtpForm] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: '',
    newPassword: '',
  });
  const [otp, setOtp] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      enqueueSnackbar('Invalid email format. Please use a Gmail address', {
        variant: 'error',
      });
      return;
    }

    if (password.length < 8) {
      enqueueSnackbar('Password must be at least 8 characters long', {
        variant: 'error',
      });
      return;
    }

    try {
      setUserData({
        email: email,
        newPassword: password,
      });
      const res = await axios.get(
        `http://localhost:8080/api/v1/users/verifyEmail/${email}`,
      );

      if (res.status === 200) {
        await axios.post('http://localhost:8080/api/v1/users/sendOtp', {
          email: email,
        });
        setShowOtpForm(true);
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.err, { variant: 'error' });
    }
  };

  const handleOtpSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!otp) {
      enqueueSnackbar('OTP is required', { variant: 'error' });
      return;
    }

    try {
      await axios
        .post('http://localhost:8080/api/v1/users/verifyOTP', {
          email: userData.email,
          code: otp,
        })
        .then(async () => {
          enqueueSnackbar('OTP verified', { variant: 'success' });
          await axios
            .put('http://localhost:8080/api/v1/users/resetPassword', {
              email: userData.email,
              newPassword: userData.newPassword,
            })
            .then(() => {
              enqueueSnackbar('Password reset successfully', {
                variant: 'success',
              });
              navigate('/');
            })
            .catch(err =>
              enqueueSnackbar(err.response.data.err, { variant: 'error' }),
            );
        })
        .catch(err =>
          enqueueSnackbar(err.response.data.err, { variant: 'error' }),
        );
    } catch (err) {
      enqueueSnackbar(err.response.data.err, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          flex: '1 0 auto',
          backgroundColor: '#ffffff',
          textAlign: 'center',
          paddingTop: 8,
          paddingBottom: 20,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            paddingBottom: 3,
            fontWeight: 'bold',
            fontStyle: 'italic',
            backgroundcolor: 'primary',
            backgroundImage: `linear-gradient(45deg, #FE5E7F, #FE5E7F)`,
            backgroundSize: '100%',
            backgroundRepeat: 'repeat',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Lost your password? Please enter your email address.
          <br /> You will receive OTP to create a new password via email.
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={5}>
            <Paper
              elevation={6}
              sx={{ padding: '20px', marginTop: '20px', width: '500px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingBottom: 15,
                  paddingTop: 6,
                }}
              >
                <img
          src={signupLogo}
          alt="Login"
          style={{ width: "15%", height: "auto" }}
        />
                <Typography
                  component="h1"
                  variant="h4"
                  color="black"
                  fontWeight="bold"
                  fontFamily="Tahoma"
                  sx={{ paddingBottom: 2, paddingTop:5 }}
                >
                  Reset Password
                </Typography>
                {!showOtpForm ? (
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1, width: '75%' }}
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
                      IInputProps={{ sx: { borderRadius: 0 } }}
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
                        borderRadius: 4,
                        fontSize: "bold",
                        height: 35,
                      }}
                    >
                      Reset
                    </Button>
                  </Box>
                ) : (
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleOtpSubmit}
                    sx={{ mt: 1, width: '100%' }}
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
                      onChange={e => setOtp(e.target.value)}
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
                        borderRadius: 4,
                        fontSize: "bold",
                        height: 35,
                      }}
                    >
                      Verify OTP
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
