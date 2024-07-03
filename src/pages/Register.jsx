import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField, Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";

import toast, { Toaster } from "react-hot-toast";

import GoogleIcon from "@mui/icons-material/Google";
import { SignUp, SignInGoogle } from "../services/apiUsers";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await SignUp(userData.email, userData.password);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setUserData({ email: "", password: "" });
    }
  }

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100dvh"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Box
        width="50%"
        height="100%"
        sx={{
          backgroundImage: "url('login.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        display={isSmallScreen ? "none" : "block"}
      />
      <Box
        width={isSmallScreen ? "100%" : "50%"}
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box marginBottom="2rem">
          <Typography variant="h3" component="p" textAlign="center">
            Welcome
          </Typography>
          <Typography variant="subtitle1" component="p" textAlign="center">
            Create your account to continue
          </Typography>
        </Box>
        <Box onSubmit={handleSubmit} width="50%" component="form">
          <Box marginBottom="1rem">
            <TextField
              fullWidth
              required
              type="email"
              id="email"
              label="email"
              variant="outlined"
              autoComplete="off"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Box>
          <Box marginBottom="1rem">
            <TextField
              fullWidth
              required
              type="password"
              id="password"
              label="password"
              variant="outlined"
              autoComplete="off"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Box>

          {isLoading ? (
            <LoadingButton loading variant="contained" fullWidth>
              Submit
            </LoadingButton>
          ) : (
            <Button variant="contained" type="submit" fullWidth>
              Create Account
            </Button>
          )}

          <Box textAlign="right" marginTop="1rem">
            <Button onClick={SignInGoogle}>
              <GoogleIcon sx={{ marginRight: "0.5rem" }} />
              Google
            </Button>
          </Box>
        </Box>
        <Box marginTop="1rem" textAlign="center">
          <Typography
            variant="subtitle1"
            component="span"
            marginRight="0.5rem"
            textAlign="left"
          >
            Already have an account?
            <Link
              to="../login"
              style={{ color: "#1769aa", marginLeft: "10px" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
