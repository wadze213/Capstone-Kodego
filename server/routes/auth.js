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

let image_name_var = "";

function formatImageName(string) {
  return string.split(" ").join("").toLowerCase();
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const multer = require("multer");
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

const upload = multer({ storage: storage });

router.post("/insertIngredient", recipe_controller.addIngredient);
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
router.get("/getIngredient", recipe_controller.getIngredient);
router.delete(
  "/delIngredient/:ingredient_name",
  recipe_controller.delIngredient
);
router.delete("/cancelRecipe/:recipe_name", recipe_controller.cancelRecipe);

router.post("/registeruser", user_controller.registerUser);
router.post("/loginuser", user_controller.loginUser);
router.get("/loginuser", user_controller.loginStatus);

router.post("/insertCart", recipe_controller.insertCart);
router.get("/displayRecipe", recipe_controller.displayRecipe);
router.get("/displayRecipe1/:id", recipe_controller.displayRecipe1);
router.get("/ingredient/:id", recipe_controller.ingredient);
router.get("/DisplayMenu", recipe_controller.DisplayMenu);
router.delete("/delRecipe/:recipe_id", recipe_controller.delRecipe);
module.exports = router;
