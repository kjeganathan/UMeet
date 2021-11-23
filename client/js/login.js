'use strict';

let createAccountbutton = document.getElementById('createAccountLogin');

createAccountbutton.addEventListener('click', async () => {
const createemail = document.getElementById('createEmailInput').value;
const createfirstName = document.getElementById('firstName').value;
const createlastName = document.getElementById('createLastName').value;
const createpassword = document.getElementById('createPasswordInput').value;
    let response = await fetch('/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                email: createemail,
                password: createpassword,
                firstName: createfirstName,
                lastName:createlastName,
                previousBookings:[],
                upcomingBookings:[]
        })
    });
});

let loginButton = document.getElementById('login');

loginButton.addEventListener('click', async () => {
    const email = document.getElementById('exampleInputEmail1').value;
    //store email in localstorage.json
    let storeLocally = require('./../../localStorage.json');
    storeLocally["email"] = JSON.stringify(email);
    
    console.log(JSON.stringify(email));
    await fetch('/login');
    localStorage.setItem("email", JSON.stringify(email));
    document.location.href = "https://u-meet.herokuapp.com/profilePage";
    });

