const signupButton = document.getElementById('login');

function talk() {
  const myword = document.getElementById('chat').value;
  const render = document.getElementById('password');
  var url = `https://api.dialogflow.com/v1/query?v=2015091&lang=en&query=${myword}&sessionId=12345`;
  fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 855c80661da64bf8be4968dd994d0e8e',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var text = data.result.fulfillment.speech;
      console.log(text);
      render.value = text;
    });
}

signupButton.addEventListener('click', talk);
