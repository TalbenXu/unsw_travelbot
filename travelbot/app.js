const express = require('express'); 
const path = require('path');
const mysql = require('mysql');

const app = express();
const html = path.join(__dirname+'/public/html');
const port = process.argv[2] || 3000;
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "baobeiwoai0Z"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.json());
app.use(express.static('public'));
app.use(function (req, res, next) {
  console.log('Request Type:', req.method, 'Request URL:', req.originalUrl)
  next()
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/login',function(req,res){
  res.sendFile(path.join(html+'/login.html'));
});

app.get('/signup',function(req,res){
  res.sendFile(path.join(html+'/signup.html'));
});

app.post('/api/signup',function(req,res){
  console.log(req.body);
  console.log(req.body.username)
  let sql = "INSERT INTO `travelbot`.`User` (`username`, `emal`, `password`) VALUES ('" + req.body.username + "','"+ req.body.email + "','" + req.body.password + "');";  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });    
  res.send(req.body); 
});

app.post('/api/login',function(req,res){
  console.log(req.body);
  console.log(req.body.username)
  // let sql = "INSERT INTO `travelbot`.`User` (`username`, `emal`, `password`) VALUES ('" + req.body.username + "','"+ req.body.email + "','" + req.body.password + "');";  
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Result: " + JSON.stringify(result));
  // });    
  res.send(req.body); 
});

app.listen(port);
console.log(`Running at Port ${port}`); 

