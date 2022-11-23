import React, { useState } from 'react'
import classes from './forms.module.scss';
import Axios from 'axios'

const RegisterForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address1, setaddress1] = useState("");
    const [address2, setaddress2] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("Philippines");

    const [formAlert, setFormAlert] = useState("All fields are mandatory")

    let register = (e) => {
        e.preventDefault();
        console.log(password, confirmPassword)
        Axios.post('http://localhost:3001/api/registeruser',
        {
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            address_one: address1,
            address_two: address2,
            region: region,
            country: country
        }).then((response)=>{
            console.log(response.data.message);
            setFormAlert(response.data.message)
        })
    }
  return (
    <div className={classes.container}>
        <h1 className={classes.formtitle}>Register</h1>
        <form className={classes.formcontainer}>
        <span className={classes.formAlerts}>{formAlert}</span>
            <div className={classes.inputfield}>
                <label for="username">Username</label>
                <input type="text" name="username" placeholder='Username' onChange={(e)=> {setUsername(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="email">Email</label>
                <input type="email" name="email" placeholder='Email' onChange={(e)=> {setEmail(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder='Password' onChange={(e)=> {setPassword(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="confirm_password">Confirm password</label>
                <input type="password" name="confirm_password" placeholder='Confirm Password' onChange={(e)=> {setConfirmPassword(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="adress1">Address Line 1</label>
                <input type="text" name="adress1" placeholder='Appt/House number, Building/Subdivision' onChange={(e)=> {setaddress1(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="address2">Address Line 2</label>
                <input type="text" name="address2" placeholder='Street, Brgy, City' onChange={(e)=> {setaddress2(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="region">Region</label>
                <input type="text" name="region" placeholder='Region' onChange={(e)=> {setRegion(e.target.value)}}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="country">Country</label>
                <input type="text" name="country" value="Philippines" disabled></input>
            </div>
            <input type="submit" name="registerSubmit" value="Register" onClick={register}></input>
        </form>
    </div>
  )
}

export default RegisterForm
