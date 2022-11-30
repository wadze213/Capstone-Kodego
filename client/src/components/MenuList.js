import React from "react";
import classes from "./MenuList.module.scss";
import { FaTrash } from "react-icons/fa";
import Axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const RecipeListContainer = ({ recipeSample }) => {
  const navigate = useNavigate();

  const delRecipe = (recipe) => {
    Axios.delete(`http://localhost:3001/api/delRecipe/${recipe}`);

    console.log(recipe);

    swal({
      title: "Are you sure?",
      text: "Once deleted,the Recipe will be removed from your Menu List.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Recipe has been removed.", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your recipe is safe!");
      }
    });
  };

  return (
    <div className={classes.container}>
      {recipeSample.map((recipe) => {
        return (
          <div className={classes.recipeCard} key={recipe.recipe_id}>
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
            </div>

            <div
              className={classes.remmove}
              onClick={() => {
                delRecipe(recipe.recipe_id);
              }}
            >
              <FaTrash />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeListContainer;
