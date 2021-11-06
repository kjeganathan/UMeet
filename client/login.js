'use strict';

function configurethis(){ 
    let createfirstName = document.getElementById('firstName').innerHTML;
    console.log(createfirstName);
}

let createAccountbutton = document.getElementById('createAccountLogin');
let createfirstName = document.getElementById('firstName').value;
let createlastName = document.getElementById('createLastName').value;
let createemail = document.getElementById('createEmailInput').value;
let createpassword = document.getElementById('createPasswordInput');
let verifyPassword = document.getElementById('createVerifyPasswordInput');
let createuserId = "";
let creategroups = [];
let createpreviousBookings = [];
let createupcomingBookings = [];

createAccountbutton.addEventListener('click', async () => {
    fetch('/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                email: createemail,
                firstName: "i",
                lastName:"hi",
                userId: "",
                groups: [],
                previousBookings:[],
                upcomingBookings:[]
            }
        })
    });
})

