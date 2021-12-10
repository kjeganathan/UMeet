'use strict';

window.addEventListener("load", async function() {

	const email = localStorage.getItem("email");
	const password = localStorage.getItem("password");

	let personDetails = document.getElementById('personDetails');
	const namediv = document.createElement('div');
	namediv.classList.add('profileName');
	namediv.setAttribute('contentEditable', true);
	namediv.setAttribute('id', 'profileName');

	let responseUser = await fetch('/userInfo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: JSON.parse(email)
		})
	});

	let userdata = await responseUser.json();
	//console.log(userdata[0]["firstname"] + " " + userdata[0]["lastname"]);

	namediv.innerText = userdata[0]["firstname"] + " " + userdata[0]["lastname"];
	personDetails.appendChild(namediv);

	const emaildiv = document.createElement('div');
	emaildiv.classList.add('profileEmail');
	emaildiv.setAttribute('contentEditable', true);
	emaildiv.setAttribute('id', 'profileEmail');
	emaildiv.innerText = userdata[0]["email"];
	personDetails.appendChild(emaildiv);

	//call the function to display booking cards
	loadBookings(email);

});

async function loadBookings(email) {
	let tentative_html = "";
	let btn = "";
	let result = await fetch(`/bookingInformation`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email
		})
	})
	let bookings = await result.json();
	bookings.forEach((my_booking) => {
		let meeting_html = `<div class="card" id="card1">
    <div class="card-horizontal">
        <div class="card-body-pic">
          <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
          <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
      </svg>
        </div>
        <div class="card-body">
            <div class="flex-card-title">
                <!--Card Room Name-->
                <h4 id="card-building" class="card-title">${my_booking.building}</h4>
                
            </div>
            <!--Card Room Star Rating-->
            <div class="stars">
                <i id="card-star-1" class="fas fa-star" style="color: #dddddd"></i>
                <i id="card-star-2" class="fas fa-star" style="color: #dddddd"></i>
                <i id="card-star-3" class="fas fa-star" style="color: #dddddd"></i>
                <i id="card-star-4" class="fas fa-star" style="color: #dddddd"></i>
                <i id="card-star-5" class="fas fa-star" style="color: #dddddd"></i>
            </div>
            <!--Card Room Description-->
            <div id="card-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-calendar-week" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
                <p id="card-room-type" class="card-text">Date: ${my_booking.date}</p>
            </div>

            <div id="card-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
              </svg>
              <p id="card-address" class="card-text">Time: ${my_booking.time}</p>
            </div>

            <!--<div class="flex-container-buttons">
                <button type="button" class="card-button btn btn-dark" id="n111details">Details</button>
            </div>-->
        </div>
    </div>
</div>`;
		tentative_html += meeting_html;
	});
	document.getElementById("booking-cards").innerHTML = tentative_html;



}


let btn = document.getElementById("myBtn");
let deleteBtn = document.getElementById("deleteBtn");

//Delete User
deleteBtn.addEventListener('click', async () => {
	localStorage.removeItem("email");
	localStorage.removeItem("password");
	document.location.href = "https://u-meet.herokuapp.com/";
	await fetch('/deleteUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: JSON.parse(email)
		})
	});

});

//Edit User Info
btn.addEventListener('click', async () => {
	const email = document.getElementById('profileEmail').innerText;
	const name = document.getElementById('profileName').innerText;
	const nameArray = name.split(" ");
	const firstName = nameArray[0];
	const lastName = nameArray[1];
	localStorage.setItem("email", JSON.stringify(email));
	//edits info based on password
	await fetch('/editInfo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: JSON.parse(password),
			firstname: firstName,
			lastname: lastName
		})
	});

	//person's info is displayed based on their email in localstorage so email in localstorage has to be updated
	window.alert(`user info has been edited to name: ${name} and email: ${email}!`);
});

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

// Create booking cards
let bookings = [

];

let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
	localStorage.clear();
	document.location.href = "https://u-meet.herokuapp.com/";
});