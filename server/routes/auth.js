const path = require("path");
const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const recipe_controller = require("../controllers/recipe_auth");
const user_controller = require("../controllers/user_auth");

require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

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

// Post request to add ingredients
router.post("/insertIngredient", recipe_controller.addIngredient);
// Get request to get ingredients
router.get("/getIngredient", recipe_controller.getIngredient);
// Delete request to delete ingredients
router.delete(
  "/delIngredient/:ingredient_name",
  recipe_controller.delIngredient
);
// Delete request to delete recipe when it's cancelled
router.delete("/cancelRecipe/:recipe_name", recipe_controller.cancelRecipe);

// Post request to register user
router.post("/registeruser", user_controller.registerUser);
// Post request to log in user
router.post("/loginuser", user_controller.loginUser);
// Get request to get current user status and data if logged in
router.get("/loginuser", user_controller.loginStatus);

// Post request to insert recipe in menu
router.post("/insertCart", recipe_controller.insertCart);
// Get request to display recipes
router.get("/displayRecipe", recipe_controller.displayRecipe);
// Get request to display specific recipe based on link
router.get("/displayRecipe1/:id", recipe_controller.displayRecipe1);
// Get request to get recipe ingredient based on recipe ID
router.get("/ingredient/:id", recipe_controller.ingredient);
// Get request to display menu recipes
router.get("/DisplayMenu", recipe_controller.DisplayMenu);
// Delete request to delete a recipe from menu
router.delete("/delRecipe/:recipe_id", recipe_controller.delRecipe);

module.exports = router;
