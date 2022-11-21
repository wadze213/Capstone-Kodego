import React from 'react'
import classes from './recipeforms.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const RecipeIngredientsForm = () => {
  return (
    <div className={classes.container}>
        <h1 className={classes.formtitle}>Recipe ingredients</h1>
        <form className={classes.formcontainer}>
            <div className={classes.inputfield}>
                <label for="recipe_title">Ingredient name</label>
                <input type="text" name="ingredient_name" placeholder='Ingredient name'></input>
            </div>
            <div className={classes.inputfield}>
                <label for="ingredient_quantity">Ingredient quantity</label>
                <input type="number" name="ingredient_quantity" placeholder='Quantity'></input>
            </div>
            <div className={classes.inputfield}>
                <label for="ingredient_unit">Quantity units</label>
                <select>
                    <option value="">Select unit</option>
                    <option value="filipino">Kilogram(Kg)</option>
                    <option value="chinese">Gram(g)</option>
                    <option value="chinese">Mililiter(mL)</option>
                    <option value="chinese">Liters(L)</option>
                    <option value="chinese">Tablespoon(TBSP)</option>
                    <option value="chinese">Teaspoon(TSP)</option>
                    <option value="chinese">Pieces</option>
                    <option value="chinese">Cups</option>
                </select>
            </div>
            <input type="submit" name="ingredientSubmit" value="Add ingredient"></input>
            <div className={classes.ingredientlist}>
                <div className={classes.ingredientContainer}>
                    <p>Tomato, 3 pieces.</p>
                    <HighlightOffIcon/>
                </div>
                <div className={classes.ingredientContainer}>
                    <p>Red onion, 1 pieces.</p>
                    <HighlightOffIcon/>
                </div>
                <div className={classes.ingredientContainer}>
                    <p>Chicken breast, 1 Kg.</p>
                    <HighlightOffIcon/>
                </div>
                <div className={classes.ingredientContainer}>
                    <p>Coconut milk, 2 cups.</p>
                    <HighlightOffIcon/>
                </div>
            </div>
        </form>
    </div>
  )
}

export default RecipeIngredientsForm
