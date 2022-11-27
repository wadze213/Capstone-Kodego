import React, {useEffect,  useState} from 'react';
import Axios from 'axios';
import classes from './userHeader.module.scss'

const UserHeader = () => {
    const [loginStatus, setLoginStatus] = useState("Logged out")

    Axios.defaults.withCredentials = true;

    useEffect(()=>{
            Axios.get("http://localhost:3001/api/loginuser").then((response) => {
                console.log(response)
                if(response.data.loginStatus === true){
                    setLoginStatus(`Welcome, ${response.data.user[0].username}`)
                }else{
                    setLoginStatus(`Logged out`)
                }
        });
    },[]);

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <a href="/userhome"><h3>U COOKIN</h3></a>
      </div>
      <div className={classes.status}>
        <small>{loginStatus}</small>
      </div>
    </div>
  )
}

export default UserHeader
