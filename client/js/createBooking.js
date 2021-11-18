'use strict';

let logoutButton = document.getElementById('logOut');
logoutButton.addEventListener('click', () => {
    document.location.href = "http://localhost:3000/";
});
