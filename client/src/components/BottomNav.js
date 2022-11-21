import React from 'react'
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import classes from './bottomNav.module.scss'
import {Link} from 'react-router-dom';

const BottomNav = (props) => {
    function activeLink(active){
        if(active === props.selected){
            return classes.selectedContainerItem;
        }else{
            return classes.containerItem;
        }
    }
    
  return (
    <div className={classes.container}>
        <Link to="/userhome" className={activeLink("explore")}>
            <ExploreIcon/>
            <p>Explore</p>
        </Link>

        <Link to="/createrecipe" className={activeLink("create")}>
            <AddIcon/>
            <p>Create</p>
        </Link>
        
        <Link to="/usermenu" className={activeLink("menu")}>
            <RestaurantMenuIcon/>
            <p>Menu</p>
        </Link>
    </div>
  )
}

export default BottomNav
