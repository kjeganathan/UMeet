'use strict';

let createAccountbutton = document.getElementById('createAccountLogin');
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

let loginButton = document.getElementById('login');
loginButton.addEventListener('click', async () => {
    await fetch('/login');
    document.location.href = "http://localhost:3000/bookingPage";
});