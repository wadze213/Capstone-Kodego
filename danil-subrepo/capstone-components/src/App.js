import './App.css';
import Box from '@mui/material/Box';
import LogIn from './components/LogIn';
import Register from './components/Register'



function App() {
  return (
    <div className="App">
      <blockquote>Log in form</blockquote>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{backgroundColor: "white"}}>
        <LogIn/>
      </Box>
      <blockquote>Register form</blockquote>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{backgroundColor: "white"}}>
        <Register/>
      </Box>
    </div>
  );
}

export default App;
