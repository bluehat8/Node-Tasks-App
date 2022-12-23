const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();
app.set('port', 4000);


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));

app.set('view engine', 'hbs');


/*app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'crudnodejs'
}, 'single'));*/


app.use(myconnection(mysql, {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
}, 'single'));


app.listen(app.get('port'), ()=>{
console.log('Listenin on port: ',app.get('port'));
});

app.get('/', (req, res)=>{
  res.render('home');
})

app.use('/', tasksRoutes);

app.get('/', (req, res) => {
  res.render('home');
});




