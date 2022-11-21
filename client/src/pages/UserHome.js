import React from 'react'
import BottomNav from '../components/BottomNav'
import RecipeListContainer from '../components/RecipeListContainer'
import classes from './pagesClasses.module.scss'

const UserHome = () => {
    let recipeSample = [{id: 1,title: "Crispy pork belly lechon", category: "Filipino classics", author:"Alex"}, {id: 2,title: "Beef brocolli with scallions", category: "Chinese classics", author:"Wu Han"}];
    
  return (
    <div>
        <div className={classes.pageHeader}>
            <h1>EXPLORE</h1>
            <p>Explore and discover new recipes created by pationate home chefs like you.</p>
        </div>
        
        <RecipeListContainer title="Featured recipes" recipeSample={recipeSample} remove={false}/>
        <BottomNav selected="explore"/>
    </div>
  )
}

export default UserHome
