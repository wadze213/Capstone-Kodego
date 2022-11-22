import React from 'react'
import classes from './pagesClasses.module.scss'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <div>
      <div className={classes.pageHeader}>
            <h1>Register</h1>
            <p>Already have an account ? <a href="login">Log in here.</a></p>
        </div>
        <RegisterForm/>
    </div>
  )
}

export default Register
