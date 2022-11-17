import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';

export default function UserLayout() {
  const [value, setValue] = React.useState('Discover');


  return (
    <div>
      {/* <Paper sx={{position: 'fixed', top:0, left:0, right:0, backgroundColor: "#fff", zIndex:1000}} elevation={3}>
        <Typography variant='h4' sx={{margin: "1rem"}}>U Cookin</Typography>
      </Paper> */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: "#fff", zIndex: 1000}} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Discover" icon={<ExploreIcon />} />
            <BottomNavigationAction label="Create" icon={<AddIcon />} />
            <BottomNavigationAction label="Menu" icon={<RestaurantMenuIcon />} />
            <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
          </BottomNavigation>
        </Paper>
    </div>
    
  );
}