import React, {useState} from 'react'
import classes from './pagesClasses.module.scss'
import LogInForm from '../components/LogInForm'
import Axios from 'axios';

const LogIn = () => {

  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");

  let login = () => {
    Axios.post('http://localhost:3001/loginuser',
    {
      username: username,
      password: password
    }).then((response)=>{
      console.log(response);
    })
  }
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
