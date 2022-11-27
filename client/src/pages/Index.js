import React from 'react'
import Home from './Home'
import UserHome from './UserHome'
import UserMenu from './UserMenu';
import CreateRecipe from './CreateRecipe';
import LogIn from './LogIn';
import Register from './Register';
import Recipe from './Recipe';
import RecipeIngredientsForm from '../components/RecipeIngredientsForm';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/login' element={<LogIn/>}></Route>
            <Route exact path='/register' element={<Register/>}></Route>
            <Route exact path='/userhome' element={<UserHome/>}></Route>
            <Route exact path='/usermenu' element={<UserMenu/>}></Route>
            <Route exact path='/createrecipe' element={<CreateRecipe/>}></Route>
            <Route exact path='/recipe/:id' element={<Recipe/>}></Route>
            <Route exact path='/createrecipe/addingredient:recipe_name' element={<RecipeIngredientsForm/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default Index
