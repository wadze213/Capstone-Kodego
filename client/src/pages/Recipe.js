import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeInfo from "../components/RecipeInfo";
import BottomNav from "../components/BottomNav";
import Axios from "axios";
import UserHeader from "../components/UserHeader";

const Recipe = () => {
  const params = useParams();

  const [recipeList1, setRecipeList1] = useState([]);
  const [ingredient, setingredient] = useState([]);

  //Fetch recipe data
  useEffect(() => {
    const url = `http://localhost:3001/api/displayRecipe1/${params.id}`;
    Axios.get(url).then((response) => {
      setRecipeList1(response.data);
    }, []);

    //Fetch recipe ingredients data
    const url2 = `http://localhost:3001/api/ingredient/${params.id}`;
    Axios.get(url2).then((response) => {
      setingredient(response.data);
    }, []);
  });

  return (
    <div>
      <UserHeader />
      <RecipeInfo
        title="Recipe "
        recipeSample3={recipeList1}
        ingredient={ingredient}
        remove={false}
      />

      <BottomNav selected="explore" />
    </div>
  );
};

export default Recipe;
