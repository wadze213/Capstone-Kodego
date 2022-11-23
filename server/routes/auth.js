const express = require('express');
const router = express.Router();
const recipe_controller = require('../controllers/recipe_auth');
const user_controller = require('../controllers/user_auth');

router.post("/insert", recipe_controller.addIngredient);

router.post("/registeruser", user_controller.registerUser);
router.post("/loginuser", user_controller.loginUser);

module.exports = router