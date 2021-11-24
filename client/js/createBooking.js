'use strict';

let n111Button = document.getElementById('n11details');
logoutButton.addEventListener('click', () => {
    localStorage.setItem("roomid")
    document.location.href = "https://u-meet.herokuapp.com/";
});


let logoutButton = document.getElementById('arnoldDetails');
logoutButton.addEventListener('click', () => {
    localStorage.setItem("roomid")
    document.location.href = "https://u-meet.herokuapp.com/roomProfile";
});
