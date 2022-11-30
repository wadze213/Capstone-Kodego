# U Cookin server

This folder is the Node.js server for U Cookin

# Work attribution 

Keep in mind the project is a collaboration as whole. Attributed work only means the team member is the main developer of the component, but all team members were involved when taking development decisions and fixing bugs or issues.

## Wadze213

### User_auth controller

- [user_auth.js](https://github.com/wadze213/Capstone-Kodego/blob/main/server/controllers/user_auth.js)  

**Register user**
```js
    exports.registerUser=(req,res)=>{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        const address_one = req.body.address_one;
        const address_two = req.body.address_two;
        const region = req.body.region;
        const country = req.body.country;
        
        // DB query to verify if username exists
        db.query("SELECT username FROM customers WHERE username = ?",[username], (err,result)=>{
            if(err){
                console.log("Registration: Username error: " +err)
            }else{
                if(result.length>0){
                    res.send({message: "Username already exists"})
                }else{
                    // DB query to verify if email exists
                    db.query("SELECT email FROM customers WHERE email = ?", [email], (err,result)=>{
                        if(err){
                            console.log("Registration: Email error" +err)
                        }else{
                            if(result.length > 0){
                                res.send({message: "Email already exists"})
                            // Condition to verify passwords match
                            }else if(password !== confirm_password){
                                res.send({message: "Passwords don't match"})
                            }else{
                                // Password hashing
                                bcrypt.hash(password, saltrounds, (err, hash) => {
                                    if(err){
                                        console.log("Registratrion: Hashing error")
                                        console.log(err)
                                    }else{
                                        // Creating user and adding it to databse
                                        db.query("INSERT INTO customers (username,email,password,address_one,address_two,region,country) VALUES(?,?,?,?,?,?,?)",[username,email,hash,address_one,address_two,region,country],(err,result)=>{
                                            if(err){
                                                console.log(`Registration: Insert error` + err)
                                            }else{
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
```

**Login User**
```js
    exports.loginUser=(req,res)=>{
        const username = req.body.username;
        const password = req.body.password;

        // DB query to verify if username exists
        db.query("SELECT * FROM customers WHERE username = ?",[username],(err,result)=>{
            if(err){
                console.log("Login: Error" +err)
            }
            if(result.length > 0){
                // Compare hashed passwords
                bcrypt.compare(password, result[0].password,(err,response)=>{
                    if(response){
                        // Creating cookie and session
                        req.session.user = result;
                        res.send({message: "Succesfully logged in"});
                        res.send({redirect: true});
                    }else{
                        res.send({message: "No matching username-passsword combination"})
                    }
                })
            }else{
                res.send({message: "Username does not exist"})

            }
        })    
    }
```

### Insert recipe with image upload using multer

```js
    // Add recipe route created here because of multer requierments
    let image_name_var = "";
    //Formats image name to make sure it matches with image name sent from front-end
    function formatImageName(string) {
        return string.split(" ").join("").toLowerCase();
    }
    // Capitalize first letter for recipe name
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Initialize multer
    const multer = require("multer");
    // Setup multer storage location and file name
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./images");
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, formatImageName(file.originalname));
            image_name_var = formatImageName(file.originalname);
        },
    });
    // Creating multer upload variable
    const upload = multer({ storage: storage });
    // Post request for creating recipes
    router.post("/insertRecipe", upload.single("image"), (req, res) => {
    const recipe_id = req.body.recipe_id;
    const recipe_name = capitalizeFirstLetter(req.body.recipe_name);
    const rec_name = recipe_name.trim();
    const category = req.body.category;
    const recipe_instruction = req.body.recipe_instruction;
    const cust_id = req.body.cust_id;
    const image_name = image_name_var;
    db.query(
        "INSERT INTO recipe (recipe_id, recipe_name, category, instructions, cust_id, image_name) VALUES(?, ?, ?, ?, ?,?);",
        [recipe_id, rec_name, category, recipe_instruction, cust_id, image_name],
        (err, result) => {
        console.log(err);
        }
    );
    });
```

## AlexPacaldo

### Support functions for recipe creation 

**Add ingredients**
```js
    exports.addIngredient = (req, res) => {
    const recipe_name = req.body.recipe_name;
    const RecName = Object.values(recipe_name);
    const ingredient_name = capitalizeFirstLetter(req.body.ingredient_name);
    const ing_name = ingredient_name.trim();
    const unit_id = parseInt(req.body.unit_id);
    const quantity = parseInt(req.body.quantity);
    // Check if ingredient exists
    db.query(
        "SELECT ingredient_name FROM ingredient WHERE ingredient_name = ?",
        ing_name,
        async function (err, result) {
        // If ingredient does not exists create new ingredient before adding it to recipe_ingredients
        if (!result.length) {
            db.query(
            "INSERT INTO ingredient (ingredient_name) VALUES(?)",
            ing_name,
            (err, result) => {
                if (!err) {
                db.query(
                    "INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, quantity) VALUES ((SELECT recipe_id FROM recipe WHERE recipe_name = ?), (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?), ?, ?);",
                    [RecName, ing_name, unit_id, quantity],
                    (err, result) => {
                    console.log(err);
                    }
                );
                } else {
                console.log(err);
                }
            }
            );
        // If ingredient exists directly insert it in recipe_ingredient
        } else {
            db.query(
            "INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit_id, quantity) VALUES ((SELECT recipe_id FROM recipe WHERE recipe_name = ?), (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?), ?, ?);",
            [RecName, ing_name, unit_id, quantity],
            (err, result) => {
                console.log(err);
            }
            );
        }
        }
    );
    };
```

**Get ingredient from database**
```js
    exports.getIngredient = (req, res) => {
    const Rec_Name = req.query.Rec_Name;
    db.query(
        "SELECT i.ingredient_name, u.unit_name,ri.quantity FROM recipe_ingredient ri JOIN ingredient i ON i.ingredient_id = ri.ingredient_id JOIN unit u ON u.unit_id = ri.unit_id WHERE recipe_id = (SELECT recipe_id FROM recipe WHERE recipe_name = ?)",
        Rec_Name,
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        }
    );
    };
```

**Delete ingredient**
```js
    exports.delIngredient = (req, res) => {
    const ingredient_name = req.params.ingredient_name;
    console.log(ingredient_name);
    db.query(
        "DELETE FROM recipe_ingredient WHERE ingredient_id = (SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?)",
        ingredient_name,
        (err, result) => {
        console.log(err);
        }
    );
    };
```

**Cancel recipe**
```js
    exports.cancelRecipe = (req, res) => {
    const recipe_name = req.params.recipe_name;
    console.log(recipe_name);
    db.query(
        "DELETE FROM recipe_ingredient WHERE recipe_id = (SELECT recipe_id FROM recipe WHERE recipe_name = ?)",
        recipe_name,
        (err, result) => {
        if (!err) {
            db.query(
            "DELETE FROM recipe WHERE recipe_name = ?",
            recipe_name,
            (err, result) => {
                console.log(err);
            }
            );
        } else {
            console.log(err);
        }
        }
    );
    };
```

## Gu-Ren

### Recipe display 

**Display recipes from back-end**
```js
    exports.displayRecipe = (req, res) => {
    db.query(
        "SELECT recipe_id, recipe_name, category,instructions, username,image_name FROM recipe INNER JOIN customers  ON recipe.cust_id= customers.cust_id",
        (err, result) => {
        res.send(result);
        }
    );
    };
```

**Display recipe based on recipe ID**
```js
        exports.displayRecipe1 = (req, res) => {
    const recipe_id = req.params.id;
    db.query(
        `SELECT recipe_id, recipe_name, category,instructions, username,image_name FROM recipe INNER JOIN customers  ON recipe.cust_id= customers.cust_id WHERE recipe_id = ${recipe_id}`,
        (err, result) => {
        res.send(result);
        }
    );
    };
```

**Get ingredients based on recipe ID**
```js
    exports.ingredient = (req, res) => {
    const ingredient_id = req.params.id;

    db.query(
        `SELECT ri.ingredient_id, ri.quantity , mu.unit_name  , i.ingredient_name  FROM recipe_ingredient ri JOIN unit mu on mu.unit_id= ri.unit_id JOIN ingredient i on i.ingredient_id = ri.ingredient_id WHERE recipe_id = ${ingredient_id}`,
        (err, result) => {
        res.send(result);
        }
    );
    };
```

### Recipe and menu interactions 

**Add recipe to menu**
```js
    exports.insertCart = (req, res) => {
    const recipe_id = req.body.recipe_id;
    const cust_id = req.body.cust_id;
    console.log(recipe_id);
    db.query(
        "INSERT INTO CART (recipe_id, cust_id) VALUES (?,?)",
        [recipe_id,cust_id],
        (err, result) => {
        if (!err) {
            res.send(result);
        }else{
            console.log(err)
        }
        }
    );
    };
```

**Display recipes in menu**
```js
    exports.DisplayMenu = (req, res) => {
    db.query(
        `SELECT recipe.recipe_id, recipe.recipe_name, recipe.category,recipe.instructions, customers.username ,recipe.image_name
        FROM cart INNER JOIN recipe ON recipe.recipe_id = cart.recipe_id
        INNER JOIN customers  ON recipe.cust_id= customers.cust_id`,
        (err, result) => {
        res.send(result);
        console.log(result);
        }
    );
    };
```

**Delete recipe from menu**
```js
    exports.delRecipe = (req, res) => {
    const recipe_id = req.params.recipe_id;
    console.log(recipe_id);
    db.query("DELETE FROM cart WHERE recipe_id =?", recipe_id, (err, result) => {
        console.log(result);
    });
    };
```