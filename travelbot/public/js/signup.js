const signupButton = document.getElementById('signup');

function tosignup(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {username:username, password:password};
    console.log(`register ${data}... to /api/signup `);

    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
    })
    .then((response) =>console.log('Success:', response));
} ;

signupButton.addEventListener('click', tosignup);