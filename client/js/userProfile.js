'use strict';

window.addEventListener("load", async function () {

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
      email:JSON.parse(email)
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
            <p id="card-room-type" class="card-text">Date: ${my_booking.date}</p>
            <p id="card-address" class="card-text">Time: ${my_booking.time}</p>
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
          email:JSON.parse(email)
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
          email:email,
          password:JSON.parse(password),
          firstname:firstName,
          lastname:lastName
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
  localStorage.removeItem("roomid");
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  document.location.href = "https://u-meet.herokuapp.com/";
});

