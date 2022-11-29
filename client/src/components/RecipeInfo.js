import React, {useState, useEffect} from "react";
import classes from "./RecipeInfo.module.scss";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Axios from "axios";

const RecipeInfo = ({ title, ingredient, recipeSample3 }) => {
  // const [menu, setMenu] = useState([]);

  const [custId, setCustId] = useState(1);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/loginuser").then((response) => {
        if(response.data.loginStatus === true){
            setCustId(response.data.user[0].cust_id)
        }
      });
  },[]);

  const handleClick = (param) => {
    console.log(recipeSample3);
    navigate(`/recipe/${param}`);
  };

  const addToMenu = (recipe_id) => {
    console.log(recipe_id);
    const url = `http://localhost:3001/api/insertCart`;
    const body = { recipe_id: recipe_id, cust_id: custId };

    Axios.post(url, body).then((response) => {
      console.log(response.data);
      navigate(`/usermenu`);
    }, []);

    swal("Recipe added to Menu successfully", {
      buttons: false,
      icon: "success",
      timer: 2000,
    });
  };

  // useEffect(addToMenu, []);

  // useEffect(()=>{

  // },[]);

  let navigate = useNavigate();

  return (
    <div className={classes.container}>
      <h1 className={classes.listTitle}>{title}</h1>
      {recipeSample3.map((recipe) => {
        return (
          <div
            className={classes.recipeCard}
            key={recipe.recipe_id}
            onClick={(event) => handleClick(recipe.ingredient_id)}
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
              <h5>Ingredients</h5>
              {ingredient.map((val) => {
                return (
                  <div key={val.ingredient_id}>
                    <ul>
                      <li>
                        {val.quantity} {val.unit_name} {val.ingredient_name}
                      </li>
                    </ul>
                  </div>
                );
              })}

              <h5>Instructions :</h5>
              <p>{recipe.instructions}</p>
            </div>
          </div>
        );
      })}

      <button
        className={classes.addtoMenu}
        onClick={(event) => addToMenu(recipeSample3[0].recipe_id)}
      >
        Add to Menu {recipeSample3.recipe_id}
      </button>
    </div>
  );
};

export default RecipeInfo;
