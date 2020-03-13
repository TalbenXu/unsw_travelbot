const button = document.querySelector('.btn')
const form   = document.querySelector('.form')

function tosignup(){
    form.classList.add('form--no') 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const data = {username:username, email:email, password:password};
    console.log(data)
    console.log(`register ${JSON.stringify(data)} to /api/signup` );

    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
    })
    .then((response) =>console.log('Success:', response));
} ;

button.addEventListener('click', tosignup);