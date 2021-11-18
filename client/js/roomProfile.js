'use strict';

// Banner: Building name 
// <div id = "buildingName"></div>
let buildingName = document.getElementById('buildingName'); 
const buildingDiv = document.createElement('div');
buildingDiv.classList.add('building');
buildingDiv.setAttribute('id', 'building');
buildingDiv.innerText = "Integrated Learning Center";
buildingName.appendChild(buildingDiv);

// Banner: Room name 
// <div id = "roomName"></div>
let roomName = document.getElementById('roomName'); 
const roomDiv = document.createElement('div');
roomDiv.classList.add('room');
roomDiv.setAttribute('id', 'room');
roomDiv.innerText = "N211";
roomName.appendChild(roomDiv);

// Banner: stars 
// <div id = "stars"></div>

// Body left-col: description 
// <div id = "description"></div>
let description = document.getElementById('description'); 
const descriptionDiv = document.createElement('div');
descriptionDiv.classList.add('room');
descriptionDiv.setAttribute('id', 'description');
descriptionDiv.innerText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
description.appendChild(descriptionDiv);

// Body left-col: maximum capacity
// <div id = "maximum-capacity"></div>
let maximumCapacity = document.getElementById('maximum-capacity'); 
const maximumCapacityDiv = document.createElement('div');
maximumCapacityDiv.classList.add('maximumCapacity');
maximumCapacityDiv.setAttribute('id', 'maximumCapacity');
maximumCapacityDiv.innerText = "200";
maximumCapacity.appendChild(maximumCapacityDiv);

// Body left-col: room type  
// <div id = "room-type"></div>
let roomType = document.getElementById('room-type'); 
const roomTypeDiv = document.createElement('div');
roomTypeDiv.classList.add('roomType');
roomTypeDiv.setAttribute('id', 'roomType');
roomTypeDiv.innerText = "Lecture Hall";
roomType.appendChild(roomTypeDiv);

// Body left-col: list of popular features 
// <div id = "popular-features"></div>

// Body left-col: location text 
// <div id="location-text"></div>
let locationText = document.getElementById('location-text'); 
const locationTextDiv = document.createElement('div');
locationTextDiv.classList.add('locationText');
locationTextDiv.setAttribute('id', 'locationText');
locationTextDiv.innerText = "650 N Pleasant St, Amherst, MA 01003";
locationText.appendChild(locationTextDiv);

let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    document.location.href = "http://localhost:3000/";
});

// Body left-col: location map 
// <div id="map">

// Body right-col: slideshow 

// Body right-col: tags 
// <div id="tags" class="tags">
