const express = require("express");
const router = express.Router();
const recipe_controller = require("../controllers/recipe_auth");
const user_controller = require("../controllers/user_auth");

router.post("/insertIngredient", recipe_controller.addIngredient);
router.post("/insertRecipe", recipe_controller.addRecipe);
router.get("/getIngredient", recipe_controller.getIngredient);
router.delete(
  "/delIngredient/:ingredient_name",
  recipe_controller.delIngredient
);
router.delete("/cancelRecipe/:recipe_name", recipe_controller.cancelRecipe);

router.post("/registeruser", user_controller.registerUser);
router.post("/loginuser", user_controller.loginUser);
router.get("/loginuser", user_controller.loginStatus);

router.get("/displayRecipe", recipe_controller.displayRecipe);
router.get("/displayRecipe1/:id", recipe_controller.displayRecipe1);
router.get("/ingredient/:id", recipe_controller.ingredient);

module.exports = router;
