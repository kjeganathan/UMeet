'use strict';

let n111Button = document.getElementById('n111details');
n111Button.addEventListener('click', () => {
    //document.location.href = "https://u-meet.herokuapp.com/";
    document.location.href = "http://localhost:3000/roomProfilePage";
});

let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    document.location.href = "https://u-meet.herokuapp.com/";
});
