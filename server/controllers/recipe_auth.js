const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

exports.addIngredient=(req,res)=>{

    const ingredient_name = req.body.ingredient_name;
    
    db.query("INSERT INTO ingredient (ingredient_name) VALUES(?)",[ingredient_name],(err,result)=>{
        console.log(result);
    })
    
}