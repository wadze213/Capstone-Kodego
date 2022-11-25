import React from 'react'
import classes from './forms.module.scss';

const RecipeInstructionForm = () => {
  return (
    <div className={classes.container}>
        <h1 className={classes.formtitle}>Recipe instructions</h1>
        <form className={classes.formcontainer}>
            <div className={classes.inputfield}>
                <label for="recipe_title">Recipe instruction</label>
                <textarea rows="10" cols="" placeholder='Recipe instructions'></textarea>
            </div>
        </form>
    </div>
  )
}

export default RecipeInstructionForm
