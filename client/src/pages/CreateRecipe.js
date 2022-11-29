import React, { useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import classes from './pagesClasses.module.scss'
import classesRIF from '../components/forms.module.scss';
import classesINST from '../components/forms.module.scss';
import Axios from 'axios'
import UserHeader from '../components/UserHeader';
import { FaUpload } from 'react-icons/fa';

const CreateRecipe = () => {

    const navigate = useNavigate();
    const [recipe_name, setRecipeName] = useState('');
    const [category, setCategory] = useState('');
    const [recipe_instruction, setRecipe_instruction] = useState('');
    const [custId, setCustId] = useState(1);
    const [image, setImage] = useState();
    const [image_name, setImageName] = useState("");

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function formatImageName(string){
      return string.split(" ").join("").toLowerCase();
    }

    useEffect(()=>{
      Axios.get("http://localhost:3001/api/loginuser").then((response) => {
          if(response.data.loginStatus === true){
              setCustId(response.data.user[0].cust_id)
          }
        });
    },[]);


    let submitRecipe=()=>{
      let originalName = document.getElementById('image').value;
      setImageName(formatImageName(originalName));

      const data = new FormData();
      data.append("recipe_name", capitalizeFirstLetter(recipe_name.trim()));
      data.append("category", category);
      data.append("recipe_instruction", recipe_instruction);
      data.append("cust_id", custId);
      data.append("image_name", image_name)
      data.append("image",image);

      // Axios.post('https://httpbin.org/anything', data).then(res=>console.log(res)).catch(err=>console.log(err));

      Axios.post("http://localhost:3001/api/insertRecipe",data).then(res=>console.log(res));
      navigate(`/createrecipe/addingredient${capitalizeFirstLetter(recipe_name.trim())}`)
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
            <div className={classesRIF.inputfield}>
              <label for="image">Recipe image</label>
              <button type='button' className={classesRIF.buttonUpload}><FaUpload />  Upload File</button>
              <input type="file" name="image" id='image'className={classesRIF.butinput} onChange={event=>{
                setImage(event.target.files[0])
              }}></input>
               
            </div>
            {/* <input type="hidden" name="image_name" id='image_name' value={image_name}></input> */}
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