import React, { useState } from 'react'
import classes from './forms.module.scss';
import Axios from 'axios';

const LogInForm = () => {
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");

  let login = (e) => {
    e.preventDefault();
    console.log(username,password)
    Axios.post('http://localhost:3001/api/loginuser',
    {
      username: username,
      password: password
    }).then((response)=>{
      console.log(response);
    })
  }
  return (
    <div className={classes.container}>
        <h1 className={classes.formtitle}>Log in</h1>
        <form className={classes.formcontainer}>
            <div className={classes.inputfield}>
                <label for="username">Username</label>
                <input type="text" name="username" placeholder='Username' onChange={(e)=> {setUsername(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder='Password' onChange={(e)=> {setPassword(e.target.value)}}></input>
            </div>
            <input type="submit" name="loginSubmit" value="Log in" onClick={login}></input>
        </form>
    </div>
  )
}

export default LogInForm