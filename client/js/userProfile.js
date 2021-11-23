'use strict';

const email = localStorage.getItem("email");

window.addEventListener("load", async function () {

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
console.log(userdata[0]["firstname"] + userdata[0]["lastname"]);

namediv.innerText = "Jane Doe";
personDetails.appendChild(namediv);

const emaildiv = document.createElement('div');
emaildiv.classList.add('profileEmail');
emaildiv.setAttribute('contentEditable', true);
emaildiv.setAttribute('id', 'profileEmail');
emaildiv.innerText = "janeDoe@umass.edu";
personDetails.appendChild(emaildiv);

});


let btn = document.getElementById("myBtn");
let deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener('click', async () => {
    document.location.href = "https://u-meet.herokuapp.com/";
    await fetch('/deleteProfile');
});


btn.addEventListener('click', async () => {
    const email = document.getElementById('profileEmail').innerText;
    const name = document.getElementById('profileName').innerText;
    await fetch('/editInfo');
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

let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    document.location.href = "https://u-meet.herokuapp.com/";
});

