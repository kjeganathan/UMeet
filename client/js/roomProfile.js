'use strict';

let roomid = localStorage.getItem("roomid");

window.addEventListener("load", async function() {

	// fetch room information 
	let roomInformationResponse = await fetch('/roomInformation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			roomid: JSON.parse(roomid)
		})
	});

	// parse response 
	let roomInformationResponseJSON = await roomInformationResponse.json();

	// Banner: Building name 
	// id = "building"
	document.getElementById('building').innerText = roomInformationResponseJSON[0]["building"];

	// Banner: Room name 
	// id = "room"
	document.getElementById('room').innerText = "Room: " + roomInformationResponseJSON[0]["room"];

	// Banner: stars 
	// id = "star-i"
	let starCount = roomInformationResponseJSON[0]["rating"];
	console.log(starCount);

	for (let i = 1; i <= starCount; ++i) {
		document.getElementById("star-" + i).style.color = "#FFFF2E";
		console.log("star-" + i);
	}

	// Popular Features 
	// id="room-type" 
	if (roomInformationResponseJSON[0]["type"] === null) {
		document.getElementById('room-type').innerText = "Traditional Classroom";
	} else {
		document.getElementById('room-type').innerText = roomInformationResponseJSON[0]["type"];
	}

	// Popular Features 
	// id="room-capacity" 
	document.getElementById('room-capacity').innerText = roomInformationResponseJSON[0]["capacity"];

	// Popular Features 
	// id="room-tech" 
	if (roomInformationResponseJSON[0]["tech"] === null) {
		document.getElementById('room-tech').innerText = "None";
	} else {
		document.getElementById('room-tech').innerText = roomInformationResponseJSON[0]["tech"];
	}

	// Popular Features 
	// id="room-building-acronym" 
	document.getElementById('room-building-acronym').innerText = roomInformationResponseJSON[0]["building_acronym"];

	// Tags 
	let arr = roomInformationResponseJSON[0]["tags"];
	let splitArr = arr.split(',');

	for (let i = 0; i < 3; ++i) {
		if (splitArr[i] === " technology-access" || splitArr[i] === "technology-access")  {
			document.getElementById('tag-' + i).innerText = "#tech-access";
		} else {
			document.getElementById('tag-' + i).innerText = "#" + splitArr[i];
		}
	}

	// Map 
	// https://mrvirk.com/passing-url-parameters-to-iframe-using-javascript.html
	let getAddress = roomInformationResponseJSON[0]["address"];
	let srcURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyADk8mwzYNCnqs8f7DjNwMllMXPGxiHrE8&q=" + getAddress;
	let mapElement = document.getElementById('map');
	mapElement.src = srcURL;
});

// Log Out Button in Navbar 
let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
	localStorage.clear();
	document.location.href = "https://u-meet.herokuapp.com/";
});