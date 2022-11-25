const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const saltrounds = 10;

dotenv.config({path:'./.env'});

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

exports.registerUser=(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const address_one = req.body.address_one;
    const address_two = req.body.address_two;
    const region = req.body.region;
    const country = req.body.country;
    
    db.query("SELECT username FROM customers WHERE username = ?",[username], (err,result)=>{
        if(err){
            console.log("Registration: Username error: " +err)
        }else{
            if(result.length>0){
                console.log("Registration: Username exists")
                console.log(result)
                res.send({message: "Username already exists"})
            }else{
                db.query("SELECT email FROM customers WHERE email = ?", [email], (err,result)=>{
                    if(err){
                        console.log("Registration: Email error" +err)
                    }else{
                        if(result.length > 0){
                            console.log("Registration: Email exists")
                            res.send({message: "Email already exists"})
                        }else if(password !== confirm_password){
                            console.log("Registration: Passwords don't match")
                            res.send({message: "Passwords don't match"})
                        }else{
                            bcrypt.hash(password, saltrounds, (err, hash) => {
                                if(err){
                                    console.log("Registratrion: Hashing error")
                                    console.log(err)
                                }else{
                                    db.query("INSERT INTO customers (username,email,password,address_one,address_two,region,country) VALUES(?,?,?,?,?,?,?)",[username,email,hash,address_one,address_two,region,country],(err,result)=>{
                                        if(err){
                                            console.log(`Registration: Insert error` + err)
                                        }else{
                                            console.log(`Registration: Success` +result)
                                            console.log(result)
                                            res.send({message: "Account created"})
                                        }
                                    })
                                }
                            })
                            
                        }
                    }
                })
            }
        }
    })    
}

exports.loginUser=(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM customers WHERE username = ?",[username],(err,result)=>{
        if(err){
            console.log("Login: Error" +err)
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password,(err,response)=>{
                if(response){
                    req.session.user = result;
                    console.log(req.session.user);
                    // console.log("Login: Success:");
                    // console.log(result);
                    res.send({message: "Succesfully logged in"});
                }else{
                    console.log("Login: No matching username-passsword combination")
                    res.send({message: "No matching username-passsword combination"})
                }
            })
            
        }else{
            console.log("Login: User does not exist")
            res.send({message: "Username does not exist"})
        }
    })    
}

exports.loginStatus=(req,res)=>{
    if(req.session.user){
        res.send({loginStatus: true, user: req.session.user})
    }else{
        res.send({loginStatus: false})
    }
}