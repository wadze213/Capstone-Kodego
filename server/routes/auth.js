const express = require('express');
const router = express.Router();
const registration_controller = require('../controllers/auth_recipe');

router.post("/insert", registration_controller.addIngredient);

module.exports = router