const login = document.getElementById('login-text');
const form = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard-text');
const button = document.querySelector('.btn')

function showForm(){
    console.log("login being click");
    form.style.display = "block";
};

function tosignup(){
    form.classList.add('form--no') 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const data = {username:username, email:email, password:password};
    console.log(data)
    console.log(`login ${JSON.stringify(data)} to /api/signup` );

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
    })
    .then((response) =>console.log('Success:', response));
    form.style.display = "block";
    dashboard.style.visibility = "visible";
} ;

button.addEventListener('click', tosignup);
login.addEventListener("click", showForm);