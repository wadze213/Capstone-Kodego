import React from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
