import React from 'react'
import classes from './recipeListContainer.module.scss'

const RecipeListContainer = ({title, recipeSample, remove}) => {
    let displayRemove = (remove) => {
        if(remove === true){
            return(
                <p className={classes.remove}>Remove from menu</p>
            )
        }
    }
  return (
    <div className={classes.container}>
        <h1 className={classes.listTitle}>{title}</h1>
        {recipeSample.map((recipe)=>{
            return(
            <div className={classes.recipeCard} key={recipe.id}>
                <div className={classes.recipeImage}></div>
                <div className={classes.recipeDescription}>
                    <h4>{recipe.title}</h4>
                    <p className={classes.recipeCategory}>{recipe.category}</p>
                    <p>Created by : {recipe.author}</p>
                    {displayRemove(remove)}
                </div>
            </div>)
        })}
            
    </div>
  )
}

// {recipeSample.map((recipe) => (
//     <div key={recipe.id} className={classes.recipeCard}>
//         <div className={classes.recipeImage}></div>
//         <div className={classes.recipeDescription}>
//             <h4>{recipe.title}</h4>
//             <p>{recipe.category}</p>
//             <p>Created by : {recipe.author}</p>
//             <button type="button">Remove from menu</button>
//         </div>
//     </div>
// ))}

export default RecipeListContainer
