'use strict';
const roomid = localStorage.getItem("roomid");

window.addEventListener("load", async function () {
    
    // Banner: Building name 
    // <div id = "buildingName"></div>
    let buildingResponse = await fetch('/buildingName', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomid:JSON.parse(roomid)
        })
    });

    let buildingResponseData = await buildingResponse.json(); 
    document.getElementById('building')

    let buildingResult = document.getElementById('building');
    buildingResult.value = buildingResponseData[i]; 

    // Banner: Room name 
    // <div id = "roomName"></div>
    let roomName = document.getElementById('roomName'); 
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');
    roomDiv.setAttribute('id', 'room');
    roomDiv.innerText = buildingResponseData[0]['room'];
    roomName.appendChild(roomDiv);

    // Banner: stars 
    // <div id = "stars"></div>
    /* 
     * This one I'm unsure about, would it use a for loop?
     * let stars = document.getElementById('stars');
     * const starsDiv = document.createElement('div');
     *starsDiv.classList.add('stars');
    */

    // Body left-col: description 
    // <div id = "description"></div>
    let description = document.getElementById('description'); 
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('room');
    descriptionDiv.setAttribute('id', 'description');
    descriptionDiv.innerText = "Lorem Ipsusm is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    description.appendChild(descriptionDiv);
    // Are we using tags for this?

    // Body left-col: maximum capacity
    // <div id = "maximum-capacity"></div>
    let maximumCapacity = document.getElementById('maximum-capacity'); 
    const maximumCapacityDiv = document.createElement('div');
    maximumCapacityDiv.classList.add('maximumCapacity');
    maximumCapacityDiv.setAttribute('id', 'maximumCapacity');
    maximumCapacityDiv.innerText = buildingResponseData[0]['capacity'];
    maximumCapacity.appendChild(maximumCapacityDiv);

    // Body left-col: room type  
    // <div id = "room-type"></div>
    let roomType = document.getElementById('room-type'); 
    const roomTypeDiv = document.createElement('div');
    roomTypeDiv.classList.add('roomType');
    roomTypeDiv.setAttribute('id', 'roomType');
    roomTypeDiv.innerText = buildingResponseData[0]['type'];
    roomType.appendChild(roomTypeDiv);

    // Body left-col: list of popular features 
    // <div id = "popular-features"></div>


    // Body left-col: location text 
    // <div id="location-text"></div>
    let locationText = document.getElementById('location-text'); 
    const locationTextDiv = document.createElement('div');
    locationTextDiv.classList.add('locationText');
    locationTextDiv.setAttribute('id', 'locationText');
    locationTextDiv.innerText = buildingResponseData[0]['address'];
    locationText.appendChild(locationTextDiv);

    // Body left-col: location map 
    // <div id="map">
    // We can try to implement the Google Maps API
    // But we'd have to use this: https://stackoverflow.com/questions/15925980/using-address-instead-of-longitude-and-latitude-with-google-maps-api
    // Might be too tricky for now

    // Body right-col: slideshow 

    // Body right-col: tags 
    // <div id="tags" class="tags">
    let tags = document.getElementById('tags');
    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('tags');
    tagsDiv.setAttribute('id', 'tags');
    tagsDiv.innerText = buildingResponseData[0]['tags'];
    tags.appendChild(tagsDiv);
});
    
// Log Out Button in Navbar 
let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    document.location.href = "https://u-meet.herokuapp.com/logOut";
});