# KODEGO CAPSTONE - Components references and documentations

This is a documentation file used to journal component creation, associated functions, states and hooks. 
This file is to be used as a documentation for the person in charge of the full stack aspect of the app. 
Components code is explained below and react environment is available in the capstone-components directory.

Live website - [Vercel](https://capstone-kodego-danil-components-amiov4wdy-wadze213.vercel.app/)

## Table of contents 

- [Forms](#forms)
    - [Log In](#log-in)
    - [Sign up](#sign-up)

## Forms

### Log in 

A simple log in form. 

The component 
```js
import React from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';[label](https://mui.com/material-ui/react-dialog/)
import styled from 'styled-components';
import { useRef } from 'react';

const FormPaper = styled(Paper)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LogIn = () => {
  const userRef = useRef("");
  const passwordRef = useRef("");

  const logValues = () => {
    let loginValObj = {
      username: userRef.current.value,
      password: passwordRef.current.value
    }
    return console.log(loginValObj)
  }

  return (
    <FormPaper>
      <Typography variant="h4" my={1}>
        Log in
      </Typography>
      <TextField required id="outlined-required" label="Username" placeholder="Username" inputRef={userRef}/>
      <TextField required id="outlined-required" label="Password" placeholder="Password" type="password" inputRef={passwordRef}/>
      <Button variant="contained" onClick={logValues}>Log in</Button>
      <Typography variant="body2" textAlign="center" gutterBottom>
          No account yet ? <a href="#">Register now.</a>
      </Typography>
    </FormPaper>
  )
}

export default LogIn
```

Value log function 
```js
const logValues = () => {
    let loginValObj = {
      username: userRef.current.value,
      password: passwordRef.current.value
    }
    return console.log(loginValObj)
  }
```

### Sign up 

A simple sign up form 

The component 
```js
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
```

Value log function 
```js
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
```

Dependencies 
- Countries from CountrySelect.js as a object array of countries information.
