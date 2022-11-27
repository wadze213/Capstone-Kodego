import React from 'react';
import classes from './RecipeInfo.module.scss';
import {  useNavigate } from 'react-router-dom';


const RecipeInfo = ({title,ingredient,recipeSample3}) => {
  const handleClick = (param) => {        
    console.log(param);
    navigate(`/recipe/${param}`)
};

let navigate = useNavigate();
 

  return (
    <div className={classes.container} >
        <h1 className={classes.listTitle}>{title}</h1>
        {recipeSample3.map((recipe)=>{
            return(
              <div className={classes.recipeCard} key={recipe.id}  onClick={event => handleClick(recipe.ingredient_id)}>
                <div className={classes.recipeImage}></div>
                <div className={classes.recipeDescription}>
                  <h4>{recipe.recipe_name}</h4>
                  <p className={classes.recipeCategory}>{recipe.category}</p>
                  <p>Created by : {recipe.username}</p>
                  <h5>Ingredients</h5> 
                  {ingredient.map((val)=>{
                    return(
                        <div >
                  
                         <ul>
                          <li>{val.quantity} {val.unit_name} {val.ingredient_name}</li>
                         </ul>
                        </div>
                      )
                    })}
 
                        

                  
                 
                  <h5>Instructions :</h5>
                  <p>{recipe.instructions}</p>
                  
                </div>
                
              </div>
            )
        })}
      
            
    </div>
  )
}

export default RecipeInfo
