const username = sessionStorage.getItem('user');
const status = document.getElementById('status');
const dash = document.getElementById('dashboard');

window.fbAsyncInit = function () {
	FB.init({
		appId: '1464130633769773',
		cookie: true, // Enable cookies to allow the server to access the session.
		xfbml: true, // Parse social plugins on this webpage.
		version: 'v6.0', // Use this Graph API version for this call.
	});

	FB.getLoginStatus(function (response) {
		// Called after the JS SDK has been initialized.
		statusChangeCallback(response); // Returns the login status.
	});
};

(function (d, s, id) {
	// Load the SDK asynchronously
	var js,
		fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = 'https://connect.facebook.net/en_US/sdk.js';
	fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

dash.addEventListener('click', () => {
	let user = sessionStorage.getItem('user');
	if (user != undefined) {
		fetch('/dash')
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				console.log(response);
				window.location.href = response.url;
			});
	} else {
		status.innerHTML = 'Please Login to Dashboard.';
	}
});

const nbl = document.querySelector('#nav-button-login');
const bfl = document.querySelector('#login-form');
const bdt = document.querySelector('#travel');
const fab = document.querySelector('#login-form > div > form > a > button');
const fac = document.querySelector('#login-form > div > form > button');

function statusChangeCallback(response) {
	// Called with the results from FB.getLoginStatus().
	console.log('statusChangeCallback');
	console.log(response); // The current login status of the person.
	if (response.status === 'connected') {
		// Logged into your webpage and Facebook.
		testAPI();
	} else {
		// Not logged into your webpage or we are unable to tell.
		document.getElementById('status').innerHTML =
			'Please log ' + 'into this webpage.';
	}
}

function checkLoginState() {
	// Called when a person is finished with the Login Button.
	FB.getLoginStatus(function (response) {
		// See the onlogin handler
		statusChangeCallback(response);
	});
}

function fb_login() {
	FB.login(function (response) {
		if (response.authResponse) {
			FB.api('/me', function (response) {
				document.getElementById('status').innerHTML =
					'Good to see you, ' + response.name + '.';
				sessionStorage.setItem('user', response.name);
				console.log(sessionStorage.getItem('user'));
			});
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
		bfl.style.display = 'none';
		bdt.style.display = 'block';
		nbl.innerHTML = 'Logout';
	});
}
document.querySelector('#login-form > div > form > button').onclick = fb_login;

function logout() {
	document.getElementById('status').innerHTML =
		sessionStorage.getItem('user') + ' logout success' + '!';
	FB.logout();
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('landmark');
	nbl.innerHTML = 'Login';
}
function testAPI() {
	// Testing Graph API after login.  See statusChangeCallback() for when this call is made.
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function (response) {
		console.log('Successful login for: ' + response.name);
		sessionStorage.setItem('user', response.name);

		document.getElementById('status').innerHTML =
			'Thanks for logging in, ' + response.name + '!';
	});
	document.querySelector('#nav-button-login').innerHTML = 'Logout';
}
nbl.onclick = (e) => {
	if (nbl.innerHTML === 'Login') {
		bfl.style.display = 'block';
		bdt.style.display = 'none';
	} else {
		logout();
	}
};
const login = document.getElementById('login-text');
const form = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard-text');
const button = document.querySelector('.btn');

function myFunction() {
	console.log('here you go');
	var obt = document.getElementById('chatbutton');
	var odiv = document.getElementById('my-botui-app');
	if (odiv.style.display == 'none') {
		odiv.style.display = 'block';
		obt.value = '隐藏模块';
	} else {
		odiv.style.display = 'none';
		obt.value = '显示模块';
	}
}

const divCom = document.querySelector('html');
divCom.addEventListener('dragover', (event) => {
	event.preventDefault();
});
divCom.addEventListener('drop', (event) => {
	event.preventDefault();
	var formData = new FormData();
	let file = event.dataTransfer.files[0];
	formData.append('upfile', file);
	fetch('/upload', {
		method: 'POST',
		body: formData,
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			//console.log(data.landmark);
			sessionStorage.setItem('landmark', data.landmark);
			console.log(sessionStorage.getItem('landmark'));
		});

	// var request = new XMLHttpRequest();
	// request.open("POST", "/upload");
	// request.send(formData);
	// var body = XMLHttpRequest.response;
	// console.log(body);
});
// function showForm() {
// 	console.log('login being click');
// 	form.style.display = 'block';
// }

// function tosignup() {
// 	//form.classList.add('form--no');
// 	const username = document.getElementById('username').value;
// 	const password = document.getElementById('password').value;
// 	const email = document.getElementById('email').value;
// 	const data = { username: username, email: email, password: password };
// 	console.log(data);
// 	console.log(`login ${JSON.stringify(data)} to /api/signup`);

// 	fetch('/api/login', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(data),
// 	}).then((response) => console.log('Success:', response));
// 	form.style.display = 'block';
// 	dashboard.style.visibility = 'visible';
// }

// button.addEventListener('click', tosignup);

// login.addEventListener("click", showForm);
// const but = document.getElementById('loginbutton');
// but.addEventListener('click',async ()=>{
// 	console.log('Hi!');
// 	fetch('/test',{method:'POST',body: JSON.stringify({user:sessionStorage.getItem('user')})})
// 	.then((response) => {
// 	return response.json();
// 	})
// 	.then((data) => {
// 	console.log(data);
// 	});
// 	});
