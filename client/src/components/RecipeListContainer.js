import React from "react";
import classes from "./recipeListContainer.module.scss";
import { useNavigate } from "react-router-dom";

const RecipeListContainer = ({ title, recipeSample, remove }) => {
  const handleClick = (param) => {
    console.log(param);
    navigate(`/recipe/${param}`);
  };

  let navigate = useNavigate();

  let displayRemove = (remove) => {
    if (remove === true) {
      return <p className={classes.remove}>Remove from menu</p>;
    }
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.listTitle}>{title}</h1>
      {recipeSample.map((recipe) => {
        return (
          <div
            className={classes.recipeCard}
            key={recipe.recipe_id}
            onClick={(event) => handleClick(recipe.recipe_id)}
          >
            <div className={classes.recipeImage}>
              <img
                src={require(`../../../server/images/${recipe.image_name}`)}
                alt="Recipe img"
              ></img>
            </div>
            <div className={classes.recipeDescription}>
              <h4>{recipe.recipe_name}</h4>
              <p className={classes.recipeCategory}>{recipe.category}</p>
              <p>Created by : {recipe.username}</p>
              {displayRemove(remove)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeListContainer;
