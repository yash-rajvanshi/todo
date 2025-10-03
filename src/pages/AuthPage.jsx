import React, { useState, useEffect } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Fade, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, CircularProgress, Typography, Container } from '@mui/material'
import { loginUser } from '../features/auth/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import TextPressure from '../components/TextPressure.jsx';

const AuthPage = () => {
  const [authState, setAuthState] = useState("login")

  const handleToggle = () => {
    setAuthState((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", minHeight: '100vh', gap: '5rem', }}>
        <Box sx={{ justifyContent: "center", alignContent: "center", height: '100vh', width: "40%", display: { xs: "none", sm: "none", md: "block", lg: "block", xl: "block" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
              width: "100%",
            }}
          >
            <img
              src="/window.jpeg"
              alt="Logo"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </Box>

        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Fade in={authState === "login"} timeout={{enter: 2000, exit: 0}} unmountOnExit>
            <div><Login /></div>
          </Fade>

          <Fade in={authState === "register"} timeout={{enter: 2000, exit: 0}} unmountOnExit>
            <div><Register /></div>
          </Fade>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: '1rem' }}>
            <Button
              variant="text"
              onClick={handleToggle}
              sx={{ textTransform: "none", fontSize: "0.85rem" }}
            >
              {authState === "login"
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </Button>

          </Box>



        </Box>

      </Box>
    </>
  )
}

export default AuthPage
