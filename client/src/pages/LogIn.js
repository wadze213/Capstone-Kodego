import React from 'react'
import classes from './pagesClasses.module.scss'
import LogInForm from '../components/LogInForm'

const LogIn = () => {
  return (
    <div>
      <div className={classes.pageHeader}>
            <h1>Log in</h1>
            <p>No account yet ? <a href="/register">Register here.</a></p>
        </div>
        <LogInForm/>
    </div>
  )
}

export default LogIn
