const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});


exports.addRecipe=(req,res)=>{
    
    const recipe_id = req.body.recipe_id;
    const recipe_name = req.body.recipe_name;
    const category = req.body.category;
    const recipe_instruction = req.body.recipe_instruction;
    
    db.query("INSERT INTO recipe (recipe_id, recipe_name, category, instructions, cust_id) VALUES(?, ?, ?, ?, 10);",[
        recipe_id,
        recipe_name,
        category,
        recipe_instruction
    ],(err,result)=>{
        console.log(err);
    })
    console.log(recipe_id)
    
}

exports.addIngredient=(req,res)=>{

    const recipe_name = req.body.recipe_name;
    const RecName = Object.values(recipe_name)
    const ingredient_name = req.body.ingredient_name;
    const unit_id = parseInt(req.body.unit_id);
    const quantity = parseInt(req.body.quantity);
    
    db.query("SELECT ingredient_name FROM ingredient WHERE ingredient_name = ?",ingredient_name,async function(err,result){
        if(!result.length){
            db.query("INSERT INTO ingredient (ingredient_name) VALUES(?)",ingredient_name,(err,result)=>{
                if(!err){
                    db.query("INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, quantity) VALUES ((SELECT recipe_id FROM recipe WHERE recipe_name = ?), (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?), ?, ?);",[
                        RecName,
                        ingredient_name,
                        unit_id,
                        quantity
                    ],(err,result)=>{
                        console.log(err);
                    })
                }else{
                    console.log(err)
                }
            })
        }else{
            db.query("INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, quantity) VALUES ((SELECT recipe_id FROM recipe WHERE recipe_name = ?), (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?), ?, ?);",[
                RecName,
                ingredient_name,
                unit_id,
                quantity
            ],(err,result)=>{
                console.log(err);
            })        
            }
         })

}

exports.getIngredient=(req,res)=>{
    const Rec_Name = req.query.Rec_Name;
    db.query("SELECT i.ingredient_name, u.unit_name,ri.quantity FROM recipe_ingredient ri JOIN ingredient i ON i.ingredient_id = ri.ingredient_id JOIN unit u ON u.unit_id = ri.unit_id WHERE recipe_id = (SELECT recipe_id FROM recipe WHERE recipe_name = ?)",Rec_Name,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
    
}

exports.delIngredient=(req,res)=>{
    const ingredient_name = req.params.ingredient_name;
    console.log(ingredient_name)
    db.query("DELETE FROM recipe_ingredient WHERE ingredient_id = (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?)",ingredient_name,(err,result)=>{
            console.log(err)
    })
}

exports.cancelRecipe=(req,res)=>{
    const recipe_name = req.params.recipe_name;
    console.log(recipe_name)
    db.query("DELETE FROM recipe_ingredient WHERE recipe_id = (SELECT recipe_id FROM recipe WHERE recipe_name = ?)",recipe_name,(err,result)=>{
            if(!err){
                db.query("DELETE FROM recipe WHERE recipe_name = ?",recipe_name,(err,result)=>{
                    console.log(err)
                })
            }else{
                console.log(err)
            }
    })
}


