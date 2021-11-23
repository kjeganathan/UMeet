'use strict';

let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("email");
    document.location.href = "https://u-meet.herokuapp.com/";
});
