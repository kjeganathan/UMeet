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
    if(roomInformationResponseJSON[0]["type"] === null) {
        document.getElementById('room-type').innerText = "Traditional Classroom"; 
    } else {
        document.getElementById('room-type').innerText = roomInformationResponseJSON[0]["type"]; 
    }
    
    // Popular Features 
    // id="room-capacity" 
    document.getElementById('room-capacity').innerText = roomInformationResponseJSON[0]["capacity"]; 

    // Popular Features 
    // id="room-tech" 
    document.getElementById('room-tech').innerText = roomInformationResponseJSON[0]["tech"]; 

     // Popular Features 
    // id="room-building-acronym" 
    document.getElementById('room-building-acronym').innerText = roomInformationResponseJSON[0]["building_acronym"]; 

    // Tags 
    let arr = roomInformationResponseJSON[0]["tags"]; 
    let splitArr = arr.split(','); 

    for(let i = 0; i < 3; i++) {
        console.log(splitArr[i])
        if(splitArr[i] === " technology-access") {
            document.getElementById('tag-' + i).innerText = "#tech-access";
        } else {
            document.getElementById('tag-' + i).innerText = "#" + splitArr[i];
        } 
    }

    //

    // id="tag-0"
    // if(roomInformationResponseJSON[0]["tech"] === "technology-access") {
    //     document.getElementById('tag-0').innerText = "#tech-acess";
    // } else {
    //     document.getElementById('tag-0').innerText = "#" + splitArr[0];
    // }

    // // id="tag-1"
    // if(roomInformationResponseJSON[1]["tech"] === "technology-access") {
    //     document.getElementById('tag-1').innerText = "#tech-acess";
    // } else {
    //     document.getElementById('tag-1').innerText = "#" + splitArr[1]; 
    // }

    // // id="tag-2"
    // if(roomInformationResponseJSON[2]["tech"] === "technology-access") {
    //     document.getElementById('tag-2').innerText = "#tech-acess";
    // } else {
    //     document.getElementById('tag-2').innerText = "#" + splitArr[2]; 
    // }

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