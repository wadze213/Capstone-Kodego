const express = require('express');
const app = express();
const port = 3001;
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const { post } = require('./routes/auth');
const mysql = require("mysql2");
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config({path:'./.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

app.use(cors({
  origin: true,
  methods: ["GET","POST"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  key: "userId",
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 60 * 60 * 24
  }
}));

app.use("/api", require("./routes/auth"))

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
    db.connect((err)=>{
        if (err){
            console.log(`mySQL error. ERROR: ` +err)
        }else{
            console.log(`mySQL DB connected`)
        }
    })
  })