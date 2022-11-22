const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

exports.registerUser=(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const address_one = req.body.address_one;
    const address_two = req.body.address_two;
    const region = req.body.region;
    const country = req.body.country;
    
    db.query("INSERT INTO customers (username,email,password,adress_one,address_two,region,country) VALUES(?,?,?,?,?,?,?)",[username,email,password,address_one,address_two,region,country],(err,result)=>{
        console.log(result);
    })
    
}

exports.loginUser=(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    
}