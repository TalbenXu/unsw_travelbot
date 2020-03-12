// get the data
// sent post
// console.log 
const login = document.getElementById('login');

function post(){
    fetch('/api')
    .then(res => console.log(res));
};

login.addEventListener("click", post);




// var objPeople = [
//     {
//         username: "xupei",
//         password: "123456"
//     },
//     {
//         username: "chenkaiwen",
//         password: "123456"
//     },
//     {
//         username: "sunhaojun",
//         password: "123456"
//     }
// ]

// function getInfo() {
// //    var username = document.getElementById("username").value
// //    var password = document.getElementById("password").value
// //    for(i=0; i<objPeople.length; i++){
// //        if(username == objPeople[i].username && password==objPeople[i].password){
// //            console.log(username + " is logged in!!!")
// //            return
// //        }
// //    }
//     console.log("incorrect username or password!")
// }

// function saveInfo() {
// //    var username = document.getElementById("username").value
// //    var password = document.getElementById("password").value
// //    var a = {username:username, password:password}
// //    objPeople.push(a)
//     console.log("objPeople")
// }