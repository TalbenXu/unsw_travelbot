const express = require('express');
const app = express();
const path = require('path');
const html = path.join(__dirname+'/public/html')

app.use(express.json());
app.use(express.static('public'));
app.get('/',function(req,res){
  res.sendFile(path.join(html+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/login',function(req,res){
  res.sendFile(path.join(html+'/login.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/signup',function(req,res){
  res.sendFile(path.join(html+'/signup.html'));
  //__dirname : It will resolve to your project folder.
});

app.post('/api/signup',function(req,res){
  console.log(req.body);      // your JSON
  res.send(req.body); 
  //__dirname : It will resolve to your project folder.
});
app.listen(process.env.port || 3000);
console.log('Running at Port 3000'); 

