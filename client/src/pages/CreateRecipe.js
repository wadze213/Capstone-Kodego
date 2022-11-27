import React, { useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import RecipeIngredientsForm from '../components/RecipeIngredientsForm'
import classes from './pagesClasses.module.scss'
import classesRIF from '../components/forms.module.scss';
import classesINST from '../components/forms.module.scss';
import Axios from 'axios'
import UserHeader from '../components/UserHeader'

const CreateRecipe = () => {
  
    const navigate = useNavigate();
    const [recipe_name, setRecipeName] = useState('');
    const [category, setCategory] = useState('');
    const [recipe_instruction, setRecipe_instruction] = useState('');
    const [custId, setCustId] = useState(1);
    useEffect(()=>{
      Axios.get("http://localhost:3001/api/loginuser").then((response) => {
          if(response.data.loginStatus === true){
              setCustId(response.data.user[0].cust_id)
          }
        });
    },[]);

    let submitRecipe=()=>{
      Axios.post("http://localhost:3001/api/insertRecipe", {
            recipe_name: recipe_name,
            category: category,
            recipe_instruction: recipe_instruction,
            cust_id: custId
        }).then();

        navigate(`/createrecipe/addingredient${recipe_name}`)
    }

  return (
    <div className={classes.pagecontainer}>
      <UserHeader/>
      <div className={classes.pageHeader}>
        <h1>CREATE</h1>
        <p>Create recipes to share with others and generate grocery lists from it.</p>
      </div>

      {/* RECIPEINFOFORM */}
      <div className={classesRIF.container}>
        <h1 className={classesRIF.formtitle}>Recipe information</h1>
        <form className={classesRIF.formcontainer}>
            <div className={classesRIF.inputfield}>
                <label for="recipe_name">Recipe title</label>
                <input type="text" name="recipe_name" placeholder='Recipe title' onChange={(e)=>{
                    setRecipeName(e.target.value)
                }}></input>
            </div>
            <div className={classesRIF.inputfield}>
                <label for="category">Recipe category</label>
                <select name='category' onChange={(e)=>{
                    setCategory(e.target.value)
                }}>
                    <option value="" selected hidden disabled>Select category</option>
                    <option value="Filipino">Filipino Classics</option>
                    <option value="Chinese">Chinese Classics</option>
                </select>
            </div>
        </form>
    </div>
    {/* RECIPEINFOFORM */}

    {/* RECIPEINSTFORM */}
      <div className={classesINST.container}>
          <h1 className={classesINST.formtitle}>Recipe instructions</h1>
          <form className={classesINST.formcontainer}>
              <div className={classesINST.inputfield}>
                  <label for="recipe_instruction">Recipe instruction</label>
                  <textarea rows="10" cols="" placeholder='Recipe instructions' name='recipe_instruction' onChange={(e)=>{
                    setRecipe_instruction(e.target.value)
                }}></textarea>
              </div>
          </form>
      </div>
    {/* RECIPEINSTFORM */}

      <input type="submit" name="submit" value="Next" className={classes.submitrecipe} onClick={submitRecipe}></input>
      <BottomNav selected="create"/>
    </div>
  )
}

export default CreateRecipe