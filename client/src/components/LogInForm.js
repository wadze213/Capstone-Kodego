import React, { useState } from 'react'
import classes from './forms.module.scss';

const LogInForm = () => {

  return (
    <div className={classes.container}>
        <h1 className={classes.formtitle}>Log in</h1>
        <form className={classes.formcontainer}>
            <div className={classes.inputfield}>
                <label for="username">Username</label>
                <input type="text" name="username" placeholder='Username'></input>
            </div>
            <div className={classes.inputfield}>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder='Password'></input>
            </div>
            <input type="submit" name="loginSubmit" value="Log in"></input>
        </form>
    </div>
  )
}

export default LogInForm
