const mysql = require("mysql");

require("dotenv").config();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

// Add ingredient back end function
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

// Get ingredient backend function
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

// Delete ingredient back end function
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

// Cancel recipe back-end function
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

// Display recipe back-end function
exports.displayRecipe = (req, res) => {
  db.query(
    "SELECT recipe_id, recipe_name, category,instructions, username,image_name FROM recipe INNER JOIN customers  ON recipe.cust_id= customers.cust_id",
    (err, result) => {
      res.send(result);
    }
  );
};

// Display recipe based on ID back-end function
exports.displayRecipe1 = (req, res) => {
  const recipe_id = req.params.id;
  db.query(
    `SELECT recipe_id, recipe_name, category,instructions, username,image_name FROM recipe INNER JOIN customers  ON recipe.cust_id= customers.cust_id WHERE recipe_id = ${recipe_id}`,
    (err, result) => {
      res.send(result);
    }
  );
};

// Get ingredients base don recipe ID back-end function
exports.ingredient = (req, res) => {
  const ingredient_id = req.params.id;

  db.query(
    `SELECT ri.ingredient_id, ri.quantity , mu.unit_name  , i.ingredient_name  FROM recipe_ingredient ri JOIN unit mu on mu.unit_id= ri.unit_id JOIN ingredient i on i.ingredient_id = ri.ingredient_id WHERE recipe_id = ${ingredient_id}`,
    (err, result) => {
      res.send(result);
    }
  );
};

// Insert recipe into menu back end function
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

// Display menu back end function
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

// Delete recipe back end function
exports.delRecipe = (req, res) => {
  const recipe_id = req.params.recipe_id;
  console.log(recipe_id);
  db.query("DELETE FROM cart WHERE recipe_id =?", recipe_id, (err, result) => {
    console.log(result);
  });
};
