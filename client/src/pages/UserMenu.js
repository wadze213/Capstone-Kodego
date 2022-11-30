import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import PaxCount from "../components/PaxCount";
import classes from "./pagesClasses.module.scss";
import UserHeader from "../components/UserHeader";
import Menu from "../components/Menu";
import Axios from "axios";
import { useParams } from "react-router-dom";

const UserMenu = () => {
  const [recipeList1, setRecipeList1] = useState([]);
  const params = useParams();

  //Fetch menu recipes data
  useEffect(() => {
    const url = `http://localhost:3001/api/displayRecipe1/${params.id}`;

    Axios.get(url).then((response) => {
      setRecipeList1(response.data);
    }, []);
  });

  return (
    <div>
      <UserHeader />
      <div className={classes.pageHeader}>
        <h1>MENU</h1>
        <p>
          An overlooking of the recipes you want to cook. From here, you can
          generate a grocery list and recipe instructions.
        </p>
      </div>
      <Menu recipeSample3={recipeList1} />
      <PaxCount />
      <BottomNav selected="menu" />
    </div>
  );
};

export default UserMenu;
