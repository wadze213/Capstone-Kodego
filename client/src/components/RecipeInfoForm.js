import React from 'react'
import classes from './forms.module.scss';

const RecipeInfoForm = () => {
  return (
    <div className={classes.container}>
        <h1 className={classes.formtitle}>Recipe information</h1>
        <form className={classes.formcontainer}>
            <div className={classes.inputfield}>
                <label for="recipe_title">Recipe title</label>
                <input type="text" name="recipe_title" value="" placeholder='Recipe title'></input>
            </div>
            <div className={classes.inputfield}>
                <label for="recipe_category">Recipe category</label>
                <select>
                    <option value="">Select category</option>
                    <option value="filipino">Filipino Classics</option>
                    <option value="chinese">Chinese Classics</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default RecipeInfoForm
