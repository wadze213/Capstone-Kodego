const express = require('express');
const app = express();
const port = 3001;
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const { post } = require('./routes/auth');

dotenv.config({path:'./.env'});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api", require("./routes/auth"))

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
  })