import React, { useState, useEffect } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, CircularProgress } from '@mui/material'
import { registerUser } from '../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import TextPressure from './TextPressure.jsx';

const Register = () => {
 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setshowPassword((showPassword) => !showPassword);

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if(userInfo){
       navigate('/home')
    }
  }, [userInfo]);
  



  return (
    <>
        <Box onSubmit={handelSubmit} component="form" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 'full' }}>
          <TextPressure

                    text="Register"

                    flex={true}

                    alpha={false}

                    stroke={false}

                    width={true}

                    weight={true}

                    italic={true}

                    textColor="#000000ff"

                    strokeColor="#ff0000"

                    minFontSize={36}

                />
            <TextField id="outlined-basic" value={name} onChange={(e) => setName(e.target.value)} helperText="Please enter your name" label="name" variant="outlined" size="small" sx={{mt:'1rem', width: { xs: "60vw", sm: "40vw", md: "30vw" } }} />
            <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} helperText="Please enter your email" label="email" variant="outlined" size="small" sx={{mt:'1rem', width: { xs: "60vw", sm: "40vw", md: "30vw" } }} />

            <FormControl sx={{ marginTop: "1rem", width: { xs: "60vw", sm: "40vw", md: "30vw" } }} variant="outlined" size="small">
              <InputLabel htmlFor="outlined-input-pass">password</InputLabel>
              <OutlinedInput id="outlined-input-pass"
                label="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                type={showPassword ? "text" : "password"}
              />

            </FormControl>
            <Button size="small" type='submit' disabled={loading} sx={{ marginTop: "1rem", fontSize: "0.75rem", textTransform: "none" }} variant="outlined" >
              {loading ? <CircularProgress size={20} /> : "SignUp"}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}

        </Box>
    </>
  )
}

export default Register
