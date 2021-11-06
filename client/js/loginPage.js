'use strict';

//const data = require('./testdata.json');
//console.log(data);

let createAccountbutton = document.getElementById('createAccountLogin');

if(createAccountbutton){
createAccountbutton.addEventListener('click', async () => {
const createemail = document.getElementById('createEmailInput').value;
const createfirstName = document.getElementById('firstName').value;
const createlastName = document.getElementById('createLastName').value;
const createpassword = document.getElementById('createPasswordInput').value;
window.alert(`Created new account for ${createfirstName} ${createlastName} successfully!`);
    await fetch('/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                email: createemail,
                password: createpassword,
                firstName: createfirstName,
                lastName:createlastName,
                userId: "",
                groups: [],
                previousBookings:[],
                upcomingBookings:[]
            }
        })
    });
});
}

let loginButton = document.getElementById('login');

if(loginButton){
loginButton.addEventListener('click', async () => {
    const email = document.getElementById('exampleInputEmail1').value;
    await fetch('/login');
    document.location.href = "http://localhost:3000/profilePage";
    });
} 

