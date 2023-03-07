const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config({ path: './.env'});

const app = express();
const port = 3000;

const db = mysql.createConnection({ 
  host     : process.env.DB_HOST, 
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  port: process.env.DB_PORT,  
});

app.use(cors({  // front 서버인 127.0.0.1:8080 의 요청을 허용하도록 cors 사용
    origin: 'http://localhost:8080',
    credentials:true,
}));

const publicDirectory = path.join(__dirname, './public');
// // console.log(__dirname)
app.use(express.static(publicDirectory));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(cookieParser());

db.connect( (error) => {
  if(error) {
    console.log(error);
  } else {
    console.log("MySQL Connected");
  }
});

// define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

