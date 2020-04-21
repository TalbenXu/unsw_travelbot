const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const https = require('https');
const fs = require('fs');
const detectLandmarks = require('./public/js/google-vision-sdk');
const MongoClient = require('mongodb').MongoClient;

// mongodb connect
const uri =
	'mongodb+srv://Talben:baobeiwoai0Z@test-kiwpu.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
client.connect((err) => {
	const collection = client.db('test').collection('devices');
	if (err) throw err;
	console.log('Connected!');
});

const app = express();
const html = path.join(__dirname + '/public/html');
const port = process.argv[2] || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(upload());
app.use(function (req, res, next) {
	console.log('Request Type:', req.method, 'Request URL:', req.originalUrl);
	next();
});

app.get('/', function (req, res) {
	res.sendFile(path.join(html + '/index.html'));
});

app.get('/dash', function (req, res) {
	res.json({ url: '/dashboard' });
});

app.get('/dashboard', function (req, res) {
	res.sendFile(path.join(html + '/dashboard.html'));
});

app.get('/login', function (req, res) {
	res.sendFile(path.join(html + '/facebook.html'));
});

app.get('/signup', function (req, res) {
	res.sendFile(path.join(html + '/signup.html'));
});

app.post('/api/signup', function (req, res) {
	console.log(req.body);
	console.log(req.body.username);
	let sql =
		"INSERT INTO `travelbot`.`User` (`username`, `emal`, `password`) VALUES ('" +
		req.body.username +
		"','" +
		req.body.email +
		"','" +
		req.body.password +
		"');";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log('Result: ' + JSON.stringify(result));
	});
	res.send(req.body);
});

app.post('/api/login', function (req, res) {
	console.log(req.body);
	console.log(req.body.username);
	// let sql = "INSERT INTO `travelbot`.`User` (`username`, `emal`, `password`) VALUES ('" + req.body.username + "','"+ req.body.email + "','" + req.body.password + "');";
	// con.query(sql, function (err, result) {
	//   if (err) throw err;
	//   console.log("Result: " + JSON.stringify(result));
	// });
	res.send(req.body);
});

app.post('/upload', (req, res) => {
	console.log(req.files);
	if (req.files.upfile) {
		var file = req.files.upfile,
			name = file.name,
			type = file.mimetype;
		var uploadpath = __dirname + '/uploads/' + name;
		file.mv(uploadpath, async function (err) {
			if (err) {
				console.log('File Upload Failed', name, err);
				res.send('Error Occured!');
			} else {
				console.log('File Uploaded', name);
				res.json({ landmark: await detectLandmarks(uploadpath) });
				//res.send(await detectLandmarks(uploadpath));
			}
		});
	} else {
		res.send('No File selected !');
		res.end();
	}
});
https
	.createServer(
		{
			key: fs.readFileSync('./env/https/server.key'),
			cert: fs.readFileSync('./env/https/server.crt'),
		},
		app
	)
	.listen(port, () => {
		console.log(`Running at Port ${port}`);
	});
// app.listen(port);
// console.log(`Running at Port ${port}`);
