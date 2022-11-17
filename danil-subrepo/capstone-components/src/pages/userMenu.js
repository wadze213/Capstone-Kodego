import React from 'react'
import UserLayout from '../layouts/userLayout'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const UserMenu = () => {

    let [recipeList, setRecipeList] = useState([{recipe_title: "Adobo", category: "Classic pilipino", created_by: "Daniel"}, {recipe_title: "Beef testicles", category: "International", created_by: "Borat"}]);
    console.log(recipeList);

  return (
    <div>
        <UserLayout/>
        <Container>
            <Typography variant="h2" sx={{paddingTop: "1rem"}}>Menu</Typography>
            <Typography variant="body1">Check your selected recipes and generate grocery lists.</Typography>

            <Box sx={{margin: "1rem"}}>
                {recipeList.map((recipe)=>(
                    <Card sx={{margin: "1rem"}}>
                        <CardContent>
                            <Typography variant='h4'>{recipe.recipe_title}</Typography>
                            <Typography variant='h5'>{recipe.category}</Typography>
                            <Typography variant='body2'>{recipe.created_by}</Typography>
                            <CardActions>
                                <Button size="Small">View</Button>
                                <Button size="Small">Delete</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                ))}
                
            </Box>
            <Button variant='contained' sx={{width: "100%"}}>Generate grocery list</Button>
        </Container>

    </div>
  )
}

export default UserMenu
