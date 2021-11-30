'use strict';

    let data = [
        {name: 'name0', description: 'description', date: 'XX/XX/XXXX'},
        {name: 'name1', description: 'description', date: 'XX/XX/XXXX'},
        {name: 'name2', description: 'description', date: 'XX/XX/XXXX'},
    ]

    // we need to grab room data 
    // we need to take it into an array of objects 
    // we can pull it in forEach() 

    data.forEach(res => {
        let card = document.createElement("div");

        let name = document.createTextNode('Name:' + res.name + ', ');
        card.appendChild(name);

        let description = document.createTextNode('Description:' + res.description + ', ');
        card.appendChild(description);

        let date = document.createTextNode('date:' + res.date);
        card.appendChild(date);

        let container = document.querySelector("#container");
        container.appendChild(card);
    });

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

    // Details Button 
    let getRoomDetailsButton = document.getElementById('getRoomDetails');
    getRoomDetailsButton.addEventListener('click', async () => {
        // get the room id somehow 
        localStorage.setItem("roomid", roomid);
        document.location.href = "https://u-meet.herokuapp.com/roomProfilePage";
    });

    // Log Out Button 
    let logoutButton = document.getElementById('logOut');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem("roomid");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        document.location.href = "https://u-meet.herokuapp.com/";
    });

