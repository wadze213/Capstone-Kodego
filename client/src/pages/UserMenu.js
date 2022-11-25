import React from 'react'
import BottomNav from '../components/BottomNav'
import RecipeListContainer from '../components/RecipeListContainer'
import PaxCount from '../components/PaxCount'
import classes from './pagesClasses.module.scss'
import UserHeader from '../components/UserHeader'

const UserMenu = () => {
  let recipeSample = [{id: 1,title: "Crispy pork belly lechon", category: "Filipino classics", author:"Alex"}, {id: 2,title: "Beef brocolli with scallions", category: "Chinese classics", author:"Wu Han"}];
  return (
    <div>
      <UserHeader/>
      <div className={classes.pageHeader}>
            <h1>MENU</h1>
            <p>An overlooking of the recipes you want to cook. From here, you can generate a grocery list and recipe instructions.</p>
      </div>
      <RecipeListContainer title="Recipes" recipeSample={recipeSample} remove={true}/>
      <PaxCount/>
      <BottomNav selected="menu"/>
    </div>
  )
}

export default UserMenu
