import React from 'react'
import Box from '@mui/material/Box';
import LogIn from '../components/LogIn';
import Register from '../components/Register';
import NewRecipeForm from '../components/NewRecipeForm'

const Components = () => {
  return (
    <div>
      <blockquote>Log in form</blockquote>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{backgroundColor: "white"}}>
        <LogIn/>
      </Box>
      <blockquote>Register form</blockquote>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{backgroundColor: "white"}}>
        <Register/>
      </Box>
      <blockquote>Recipe form</blockquote>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{backgroundColor: "white"}}>
        <NewRecipeForm/>
      </Box>
    </div>
  )
}

export default Components
