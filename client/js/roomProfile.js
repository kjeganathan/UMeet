'use strict';
// const roomid = localStorage.getItem("roomid");
// localStorage.setItem("roomid", JSON.stringify(roomid));

let roomid = localStorage.getItem("roomid"); 

window.addEventListener("load", async function () {

    // fetch room information 
    let roomInformationResponse = await fetch('/roomInformation', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomid:JSON.parse(roomid)
        })
    });

    // parse response 
    let roomInformationResponseJSON = await roomInformationResponse.json(); 
    
    // Banner: Building name 
    // id = "buildingName"
    document.getElementById('building').innerText = roomInformationResponseJSON[0]["building"]; 

    // Banner: Room name 
    // id = "roomName"
    document.getElementById('room').innerText = roomInformationResponseJSON[0]["room"]; 

    // Banner: stars 
    // id = "stars"

    // Popular Features 
    // id="room-type" 
    document.getElementById('room-type').innerText = roomInformationResponseJSON[0]["type"]; 

    // Popular Features 
    // id="room-capacity" 
    document.getElementById('room-capacity').innerText = roomInformationResponseJSON[0]["capacity"]; 

    // Popular Features 
    // id="room-tech" 
    document.getElementById('room-tech').innerText = roomInformationResponseJSON[0]["tech"]; 

    // Tags 
    // id="tag-0"
    let arr = roomInformationResponseJSON[0]["tags"]; 
    let arr2 = arr.split(','); 


    console.log(arr2);
    console.log(arr2[0]);
    console.log(arr2[1]);
    document.getElementById('tag-0').innerText = arr2[0]; 

    // id="tag-1"
    document.getElementById('tag-1').innerText = arr2[1]; 

    // id="tag-2"
    document.getElementById('tag-2').innerText = arr2[2]; 

    // Map 

});
    
// Log Out Button in Navbar 
let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("roomid");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    document.location.href = "https://u-meet.herokuapp.com/";
});