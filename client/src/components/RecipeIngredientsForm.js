import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './forms.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Axios from 'axios';

const RecipeIngredientsForm = () => {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const navigate = useNavigate();
    const [ingredient_name, setIngredientName] = useState('');
    const [unit_id, setUnitId] = useState();
    const [quantity, setQuantity] = useState();
    const {recipe_name} = useParams();
    const [recipeInstList, setRecipeList] = useState([]);

    const submitIngredient=(event)=>{
        
        Axios.post("http://localhost:3001/api/insertIngredient", {
            recipe_name: {recipe_name},
            ingredient_name: capitalizeFirstLetter(ingredient_name.trim()),
            unit_id: unit_id,
            quantity: quantity
        }).then(()=>{
            alert("succesfull insert")
        });
        alert("Succesfull Insert")
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/getIngredient", {
            params: {
                Rec_Name: recipe_name,
            },
        }).then((response)=>{
            setRecipeList(response.data)
          });
      },[recipe_name]);

    const deleteIngredient = (ingredient) =>{
        Axios.delete(`http://localhost:3001/api/delIngredient/${ingredient}`);
        alert("Ingredient Deleted")
    }

    const cancelRec = () =>{
        Axios.delete(`http://localhost:3001/api/cancelRecipe/${recipe_name}`);
        navigate("/userHome")
        alert("Recipe Canceled")
    }
    const SubmitRecipe = () =>{
        navigate("/userHome")
        alert("Recipe Created Successfully")
        
    }

  return (
    <div className={classes.container}>
        <h1 className={classes.formtitle}>Recipe ingredients</h1>
        <form className={classes.formcontainer} onSubmit>
            <div className={classes.inputfield}>
                <label for="recipe_title">Ingredient name</label>
                <input type="text" name="ingredient_name" placeholder='Ingredient name' onChange={(e)=>{
                    setIngredientName(e.target.value)
                }}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="quantity">Ingredient quantity</label>
                <input type="number" name="quantity" placeholder='Quantity' onChange={(e)=>{
                    setQuantity(e.target.value)
                }}></input>
            </div>
            <div className={classes.inputfield}>
                <label for="unit_id">Quantity units</label>
                <select name="unit_id" onChange={(e)=>{
                    setUnitId(e.target.value)
                }}>
                    <option value="" hidden disabled selected>Select unit</option>
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
            <input type="submit" name="ingredientSubmit" value="Add ingredient" onClick={submitIngredient}></input>
            <div className={classes.ingredientlist}>
                {recipeInstList.map((val)=>{
                    return(
                        <div className={classes.ingredientContainer}>
                            <p>{val.ingredient_name}, {val.quantity} {val.unit_name}.</p>
                            <button onClick={()=>{deleteIngredient(val.ingredient_name)}}><HighlightOffIcon/></button>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={cancelRec}>Cancel</button>
                <button onClick={SubmitRecipe}>Create Recipe!</button>
            </div>
        </form>
    </div>
  )
}

export default RecipeIngredientsForm
