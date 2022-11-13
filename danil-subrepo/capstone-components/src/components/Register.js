import React from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useRef } from 'react';
import countries from './CountrySelect';

const FormPaper = styled(Paper)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Register = () => {
    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const countryRef = useRef("");

    const logValues = () => {
        const registerValObj = {
            username: usernameRef.current.value,
            email: emailRef.current.value, 
            password: passwordRef.current.value, 
            confirmPassword: confirmPasswordRef.current.value,
            country: countryRef.current.value
        }
        return console.log(registerValObj)
    }
    return (
    <FormPaper>
      <Typography variant="h4" my={1}>
        Register
      </Typography>
      <TextField required id="outlined-required" label="Username" placeholder="Username" inputRef={usernameRef}/>
      <TextField required id="outlined-required" label="Email" placeholder="Email" type="email" inputRef={emailRef}/>
      <TextField required id="outlined-required" label="Password" placeholder="Password" type="password" inputRef={passwordRef}/>
      <TextField required id="outlined-required" label="Confirm password" placeholder="Confirm password" type="password" inputRef={confirmPasswordRef}/>

      <Autocomplete id="country-select-demo" sx={{ width: 300 }} options={countries} autoHighlight 
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
        inputRef={countryRef}
          {...params}
          label="Where are you from ?" required
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />

      <Button variant="contained" onClick={logValues}>Register</Button>
      <Typography variant="body2" textAlign="center" gutterBottom>
          Already have an account ? <a href="#">Login now.</a>
      </Typography>
    </FormPaper>
  )
}

export default Register