const express = require('express'); 
const path = require('path');
const app = express();
const html = path.join(__dirname+'/public/html');
const port = process.argv[2] || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(function (req, res, next) {
  console.log('Request Type:', req.method, 'Request URL:', req.originalUrl)
  next()
});

app.get('/',function(req,res){
  res.sendFile(path.join(html+'/index.html'));
});

app.get('/login',function(req,res){
  res.sendFile(path.join(html+'/login.html'));
});

app.get('/signup',function(req,res){
  res.sendFile(path.join(html+'/signup.html'));
});

app.post('/api/signup',function(req,res){
  console.log(req.body);      
  res.send(req.body); 
});

app.listen(port);
console.log(`Running at Port ${port}`); 

