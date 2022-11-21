import React from 'react'
import BottomNav from '../components/BottomNav'
import RecipeInfoForm from '../components/RecipeInfoForm'
import RecipeIngredientsForm from '../components/RecipeIngredientsForm'
import RecipeInstructionForm from '../components/RecipeInstructionForm'
import classes from './pagesClasses.module.scss'

const CreateRecipe = () => {
  
  return (
    <div className={classes.pagecontainer}>
      <div className={classes.pageHeader}>
        <h1>CREATE</h1>
        <p>Create recipes to share with others and generate grocery lists from it.</p>
      </div>
      <RecipeInfoForm/>
      <RecipeIngredientsForm/>
      <RecipeInstructionForm/>
      <input type="submit" name="submit" value="Create recipe" className={classes.submitrecipe}></input>
      <BottomNav selected="create"/>
    </div>
  )
}

export default CreateRecipe
