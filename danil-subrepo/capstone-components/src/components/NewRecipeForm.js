//REACT IMPORTS
import React from 'react'
import { useRef, useState, useEffect } from 'react';
//MUI IMPORTS
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled as muiStyled } from '@mui/material/styles';
//MUI ICONS IMPORT
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import EditIcon from '@mui/icons-material/Edit';
// OTHER IMPORTS 
import styled from 'styled-components';

const FormPaper = styled(Paper)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: "#FFFFFF",
  }
}));

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const NewRecipeForm = () => {

    //Creating a sample id to be replaced with database id
    let [id, setId] = useState(Date.now())

    //Category input support functions
    const [category, setCategory] = React.useState('');
    const catHandleChange = (event) => {
        setCategory(event.target.value);
    };
    //Units input support function
    const [units, setUnits] = React.useState('');
    const unitsHandleChange = (event) => {
        setUnits(event.target.value);
    };

    //Modal support functions
    const [AddIngOpen, setAddIngOpen] = React.useState(false);
    const AddIngHandleOpen = () => setAddIngOpen(true);
    const AddIngHandleClose = () => setAddIngOpen(false);

    const [AddInsOpen, setAddInsOpen] = React.useState(false);
    const AddInsHandleOpen = () => setAddInsOpen(true);
    const AddInsHandleClose = () => setAddInsOpen(false);

    //Ingredient and instruction list
    const [ingredientsList, setIngredientsList] = useState([]);

    const [instructionsList, setInstructionsList] = useState([]);

    //Form refs
    let ingredientRef = useRef("");
    let quantityRef = useRef("");
    let unitRef = useRef("")

    let instructionRef = useRef("");

    //Handle add ingredient
    let handleNewIngredient = (e) => {
        e.preventDefault();
        let displayQuantity = () => {
            let quantity = quantityRef.current.value;
            let unit = unitRef.current.value;
            return(`${quantity} ${unit}`)
        }
        let newIngredient = {
            id: id,
            ingredient_name: ingredientRef.current.value,
            quantity: displayQuantity(),
            quantityInt: quantityRef.current.value,
            unit_id: unitRef.current.value
        }
        console.log(newIngredient)
        setIngredientsList([...ingredientsList, newIngredient]);
        setId(Date.now());
        ingredientRef.current.value = "";
        quantityRef.current.value = "";
        unitRef.current.value = "";
    }
    //Handle remove ingredient
    let handleRemoveIngredient = (e) => {
        let num = parseInt(e.target.id);
        const remove = [...ingredientsList].filter((item) =>{
            return item.id !== num
        })
        setIngredientsList(remove)
    }

    //Handle add instruction
    let handleNewInstruction = (e) => {
        e.preventDefault();
        let newInstruction = {
            id: id, 
            instruction: instructionRef.current.value
        }
        setInstructionsList([...instructionsList, newInstruction]);
        setId(Date.now());
        instructionRef.current.value = "";
    }
    //Handle remove instruction 
    let handleRemoveInstruction = (e) => {
        let num = parseInt(e.target.id);
        const remove = [...instructionsList].filter((item) => {
            return item.id != num
        })
        setInstructionsList(remove)
    }
    //Handle edit instruction

    //Handle move instruction

    
  return (
    <FormPaper>
        
      <Typography variant="h4" my={1}>
        New recipe
      </Typography>
      <TextField required id="outlined-required" label="Title" placeholder="Recipe title"/>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={catHandleChange}
            >
            <MenuItem value={"Budget meal"}>Budget Meal</MenuItem>
            <MenuItem value={"Classic pilipino"}>Classic Pilipino</MenuItem>
            <MenuItem value={"International"}>International</MenuItem>
            </Select>
      </FormControl>

      <Typography variant="h4" my={1}>
        Ingredients
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400,maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Ingredient</StyledTableCell>
            <StyledTableCell align='right'>Quantity</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredientsList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.ingredient_name}
                </TableCell>
                <TableCell align="right">
                    {row.quantity}
                </TableCell>
                <TableCell align="right" sx={{width: "100px"}}>
                    <Tooltip title="Delete">
                        <IconButton aria-label="edit" color="primary" id={row.id} onClick={handleRemoveIngredient} >
                            <DeleteOutlineIcon fontSize='small' id={row.id}/>
                        </IconButton>  
                    </Tooltip>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="outlined" sx={{width: "100%"}} onClick={AddIngHandleOpen}>Add ingredient</Button>
    <Modal
        aria-labelledby="transition-modal-title"
        open={AddIngOpen}
        onClose={AddIngHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={AddIngOpen}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2" my={2}>
              Add ingredient
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={5}>
                    <TextField required id="outlined-required" label="Ingredient name" placeholder="Ingredient name" inputRef={ingredientRef}/>
                </Grid>
                <Grid xs={3}>
                    <TextField required id="outlined-required" label="Quantity" placeholder="Quantity" type="number" inputRef={quantityRef}/>
                </Grid>
                <Grid xs={4}>
                    <FormControl sx={{width: "100%"}}>
                        <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={units}
                        label="Units"
                        onChange={unitsHandleChange}
                        inputRef={unitRef}
                        >
                            <MenuItem value={"Kilograms"}>Kilograms</MenuItem>
                            <MenuItem value={"Grams"}>Grams</MenuItem>
                            <MenuItem value={"Pieces"}>Pieces</MenuItem>
                            <MenuItem value={"Cans"}>Cans</MenuItem>
                            <MenuItem value={"Cloves"}>Cloves</MenuItem>
                            <MenuItem value={"Tbsp"}>Tbsp</MenuItem>
                            <MenuItem value={"Tsp"}>Tsp</MenuItem>
                            <MenuItem value={"Cups"}>Cups</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button variant="contained" sx={{marginTop: "1rem"}} onClick={handleNewIngredient}>Add ingredient</Button>
          </Box>
        </Fade>
    </Modal>   
    
    <Typography variant="h4" my={1}>
        Instructions
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400,maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Instruction</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructionsList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.instruction}
              </TableCell>
              <TableCell align="right" sx={{width: "150px"}}>
              <Tooltip title="Edit">
                        <IconButton aria-label="edit" color="primary">
                            <EditIcon fontSize='small'/>
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title="Move up">
                        <IconButton aria-label="edit" color="primary">
                            <VerticalAlignTopIcon fontSize='small'/>
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title="Move down">
                        <IconButton aria-label="edit" color="primary">
                            <VerticalAlignBottomIcon fontSize='small'/>
                        </IconButton>  
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="edit" color="primary" id={row.id} onClick={handleRemoveInstruction}>
                            <DeleteOutlineIcon fontSize='small' id={row.id}/>
                        </IconButton>  
                    </Tooltip>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="outlined" sx={{width: "100%"}} onClick={AddInsHandleOpen}>Add Instruction</Button>
    <Modal
        aria-labelledby="transition-modal-title"
        open={AddInsOpen}
        onClose={AddInsHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={AddInsOpen}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2" my={2}>
              New Instruction
            </Typography>
            <TextField required id="outlined-required" label="Instruction" placeholder="Instruction" multiline rows={4} sx={{width : "100%"}} inputRef={instructionRef}/>
            <Button variant="contained" onClick={handleNewInstruction} sx={{marginTop: "1rem"}}>Add instruction</Button>
          </Box>
        </Fade>
    </Modal>   

    <Button variant="contained">Create recipe</Button>
      
    </FormPaper>
  )
}

export default NewRecipeForm
