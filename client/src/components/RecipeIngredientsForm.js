import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./forms.module.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Axios from "axios";
import swal from "sweetalert";

const RecipeIngredientsForm = () => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const navigate = useNavigate();
  const [ingredient_name, setIngredientName] = useState("");
  const [unit_id, setUnitId] = useState();
  const [quantity, setQuantity] = useState();
  const { recipe_name } = useParams();
  const [recipeInstList, setRecipeList] = useState([]);

  const submitIngredient = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/api/insertIngredient", {
      recipe_name: { recipe_name },
      ingredient_name: capitalizeFirstLetter(ingredient_name.trim()),
      unit_id: unit_id,
      quantity: quantity,
    });

    swal("Ingredient added  successfully", {
      buttons: false,
      icon: "success",
      timer: 2000,
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getIngredient", {
      params: {
        Rec_Name: recipe_name,
      },
    }).then((response) => {
      setRecipeList(response.data);
    });
  }, [recipe_name]);

  const deleteIngredient = (ingredient) => {
    swal({
      title: "Are you sure?",

      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Ingredient has been deleted!", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        Axios.delete(`http://localhost:3001/api/delIngredient/${ingredient}`);
      }
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  };

  const cancelRec = () => {
    swal({
      title: "Are you sure?",

      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! recipe has been canceled!", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        Axios.delete(`http://localhost:3001/api/cancelRecipe/${recipe_name}`);
        navigate("/userHome");
      }
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  };
  const SubmitRecipe = () => {
    swal("Ingredient added  successfully", {
      buttons: false,
      icon: "success",
      timer: 2000,
    }).then(() => {});
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.formtitle}>Recipe ingredients</h1>
      <form className={classes.formcontainer} onSubmit>
        <div className={classes.inputfield}>
          <label for="recipe_title">Ingredient name</label>
          <input
            type="text"
            name="ingredient_name"
            placeholder="Ingredient name"
            onChange={(e) => {
              setIngredientName(e.target.value);
            }}
          ></input>
        </div>
        <div className={classes.inputfield}>
          <label for="quantity">Ingredient quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></input>
        </div>
        <div className={classes.inputfield}>
          <label for="unit_id">Quantity units</label>
          <select
            name="unit_id"
            onChange={(e) => {
              setUnitId(e.target.value);
            }}
          >
            <option value="" hidden disabled selected>
              Select unit
            </option>
            <option value={1}>Kilogram(Kg)</option>
            <option value={2}>Gram(g)</option>
            <option value={3}>Mililiter(mL)</option>
            <option value={4}>Liters(L)</option>
            <option value={5}>Tablespoon(TBSP)</option>
            <option value={6}>Teaspoon(TSP)</option>
            <option value={7}>Pieces</option>
            <option value={8}>Cups</option>
          </select>
        </div>
        <input
          type="submit"
          name="ingredientSubmit"
          value="Add ingredient"
          onClick={submitIngredient}
        ></input>
        <div className={classes.ingredientlist}>
          {recipeInstList.map((val) => {
            return (
              <div className={classes.ingredientContainer}>
                <p>
                  {val.ingredient_name}, {val.quantity} {val.unit_name}.
                </p>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteIngredient(val.ingredient_name);
                  }}
                >
                  <HighlightOffIcon />
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              cancelRec();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              navigate("/userHome");
              SubmitRecipe();
            }}
          >
            Create Recipe!
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeIngredientsForm;
