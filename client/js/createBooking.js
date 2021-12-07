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

    window.addEventListener("load", async function () {
    });

    async function loadTentativeMeetings(email) {
        let tentative_html = "";
        await fetch(`/allRooms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.text())
        .then((result) => {
            let meetings = JSON.parse(result);
            meetings.forEach((my_booking) => {
                let meeting_html = `<div class="card" id="card1">
                <div class="card-horizontal">
                    <div class="card-body">
                        <div class="flex-card-title">
                            <!--Card Room Name-->
                            <h4 id="card-building" class="card-title">Room Name Here</h4>
                            <!--Card Room Max Capacity-->
                            <p id="card-capacty" style="padding-right: 20px">Capacity: Here</p>
                        </div>
                        <!--Card Room Star Rating-->
                        <div class="stars">
                            <i id="card-star-1" class="fas fa-star" style="color: #dddddd"></i>
                            <i id="card-star-2" class="fas fa-star" style="color: #dddddd"></i>
                            <i id="card-star-3" class="fas fa-star" style="color: #dddddd"></i>
                            <i id="card-star-4" class="fas fa-star" style="color: #dddddd"></i>
                            <i id="card-star-5" class="fas fa-star" style="color: #dddddd"></i>
                        </div>
                        <!--Card Room Description-->
                        <p id="card-room-type" class="card-text">Room Type Here</p>
                        <p id="card-address" class="card-text">Address Here</p>
                        <div class="flex-container-buttons">
                            <button type="button" class="card-button btn btn-dark" id="n111details">Details</button>
                            <button type="button" class="card-button btn btn-dark" id="bookRoom">Book</button>
                        </div>
                    </div>
                </div>
            </div>`;
        tentative_html += meeting_html;
      });
      document.getElementById("booking-rooms").innerHTML = tentative_html;
    })
    .catch((error) => {
      console.log(error);
    });
}

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

