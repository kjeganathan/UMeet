'use strict';

let createAccountbutton = document.getElementById('createAccountLogin');

createAccountbutton.addEventListener('click', async () => {
	const createemail = document.getElementById('createEmailInput').value;
	const createfirstName = document.getElementById('firstName').value;
	const createlastName = document.getElementById('createLastName').value;
	const createpassword = document.getElementById('createPasswordInput').value;
	await fetch('/createAccount', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: createemail,
			password: createpassword,
			firstname: createfirstName,
			lastname: createlastName
		})
	});
	onclick = "alert('Account created successfuly, Welcome to UMeet! Please login.')"
});

let loginButton = document.getElementById('login');

loginButton.addEventListener('click', async () => {
	const email = document.getElementById('exampleInputEmail1').value;
	const password = document.getElementById('exampleInputPassword1').value;
	localStorage.setItem("email", JSON.stringify(email));
	localStorage.setItem("password", JSON.stringify(password));
	await fetch('/login');
	//store email in localstorage.json
	document.location.href = "https://u-meet.herokuapp.com/profilePage";
});