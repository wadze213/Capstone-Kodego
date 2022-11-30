import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import RecipeListContainer from "../components/RecipeListContainer";
import classes from "./pagesClasses.module.scss";
import UserHeader from "../components/UserHeader";
import Axios from "axios";

const UserHome = () => {
  Axios.defaults.withCredentials = true;

  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/displayRecipe").then((response) => {
      setRecipeList(response.data);
      // console.log(response.data);
    });
  }, []);

  return (
    <div>
      <UserHeader />
      <div className={classes.pageHeader}>
        <h1>EXPLORE</h1>
        <p>
          Explore and discover new recipes created by pationate home chefs like
          you.
        </p>
      </div>

      <RecipeListContainer
        title="Featured recipes"
        recipeSample={recipeList}
        remove={false}
      />
      <BottomNav selected="explore" />
    </div>
  );
};

export default UserHome;
