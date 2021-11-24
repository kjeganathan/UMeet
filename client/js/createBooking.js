'use strict';

let buildingName = document.getElementById('building1').innerText;

let n111Button = document.getElementById('n111details');
n111Button.addEventListener('click', async () => {
    let building1response = await fetch('/getRoomById', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            building:buildingName
        })
    });
    let building1responseJSON = await building1response.json();
    console.log(JSON.stringify(building1responseJSON[0]["roomid"]));
    localStorage.setItem("roomid", JSON.stringify(building1responseJSON[0]["roomid"]));
    document.location.href = "https://u-meet.herokuapp.com/roomProfilePage";
});

let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    document.location.href = "https://u-meet.herokuapp.com/";
});
