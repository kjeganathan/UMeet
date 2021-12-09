"use strict";

let data = [
  { name: "name0", description: "description", date: "XX/XX/XXXX" },
  { name: "name1", description: "description", date: "XX/XX/XXXX" },
  { name: "name2", description: "description", date: "XX/XX/XXXX" },
];

// we need to grab room data
// we need to take it into an array of objects
// we can pull it in forEach()

data.forEach((res) => {
  let card = document.createElement("div");

  let name = document.createTextNode("Name:" + res.name + ", ");
  card.appendChild(name);

  let description = document.createTextNode(
    "Description:" + res.description + ", "
  );
  card.appendChild(description);

  let date = document.createTextNode("date:" + res.date);
  card.appendChild(date);

  let container = document.querySelector("#container");
  container.appendChild(card);
});



window.addEventListener("load", async function () {
  let email = localStorage.getItem("email");
  loadTentativeMeetings(email);
});

async function loadTentativeMeetings(email) {
  let tentative_html = "";
  let btn = "";
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
                            <h4 id="card-building" class="card-title">${my_booking.building}</h4>
                            <!--Card Room Max Capacity-->
                            <p id="card-capacty" style="padding-right: 20px">Capacity: ${my_booking.capacity}</p>
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
                        <p id="card-room-type" class="card-text">${my_booking.time}</p>
                        <p id="card-address" class="card-text">${my_booking.address}</p>
                        <div class="flex-container-buttons">
                            <button type="button" class="card-button btn btn-secondary" id="n111details">Details</button>
                            <button type="button" class="card-button btn btn-dark" data-toggle="modal" data-target="#myModal" id="${my_booking.roomid}">Book</button>

                                <div id="myModal" class="modal fade">
                                    <!-- Modal content -->
                                    <div class="my-modal">
                                        <div class="modal-content">
                                            <span class="close">&times;</span>
                                                <h4 class="modal-header">Date Selection</h4>
                                                <br/>
                                                <!--Date Input Box-->
                                                <div class="modal-body">
                                                <div class="date">
                                                    <div class="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="currentColor"
                                                            class="bi bi-calendar3" viewBox="0 0 16 16">
                                                            <path
                                                                d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                                            <path
                                                                d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                        </svg>
                                                    </div>
        
                                                    <div class="text">
                                                        <span id="inputNavTitle">Date</span>
                                                        <br />
                                                        <input style="width: 165px; height:30px; margin-top: 4px" type="date" id="inputNavInput"
                                                            class="form-control" placeholder="date" aria-label="date" aria-describedby="basic-addon1">
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" id="${my_booking.roomid}" class="btn btn-default" data-dismiss="modal">Submit</button>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>`;
        // localStorage.setItem("time", my_booking.time);
        // let date = document.getElementById("inputNavInput").value;
        // localStorage.setItem("date", date);
        tentative_html += meeting_html;
        
        //for each card we have a date submit button
        // let dateSubmitButton = document.getElementById(my_booking.roomid);
        // dateSubmitButton.addEventListener("click", () => {
            
        // });
      });
      document.getElementById("booking-rooms").innerHTML = tentative_html;
      const bookingButtons = document.querySelectorAll(".btn-dark");
      const dateButtons = document.querySelectorAll(".btn-default");
      bookingButtons.forEach((button) => {
        button.addEventListener("click", bookMeeting);
      });
      dateButtons.forEach((button) => {
        button.addEventListener("click", datePicker);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//Booking Button
async function bookMeeting(){
    const roomid = this.id;
    localStorage.setItem("booking_room_id", roomid);
}


//Making Date Submit Button functional
let dateButton = document.getElementById("dateSubmit");
dateButton.addEventListener("click", () => {
    //on click we check if on the selected date at the selected time there already exists a room, if not we do the following:
        //we populate the date array in rooms db
        //we make a booking in the bookings db
    //if it already exists, we say that the room cannot be booked at that time for that particular date and suggest a user chooses a new day

})

let buildingName = document.getElementById("building1").innerText;

let n111Button = document.getElementById("n111details");
n111Button.addEventListener("click", async () => {
  let building1response = await fetch("/getRoomById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      building: buildingName,
    }),
  });
  let building1responseJSON = await building1response.json();
  console.log(JSON.stringify(building1responseJSON[0]["roomid"]));
  localStorage.setItem(
    "roomid",
    JSON.stringify(building1responseJSON[0]["roomid"])
  );
  document.location.href = "https://u-meet.herokuapp.com/roomProfilePage";
});

// Details Button
let getRoomDetailsButton = document.getElementById("getRoomDetails");
getRoomDetailsButton.addEventListener("click", async () => {
  // get the room id somehow
  localStorage.setItem("roomid", roomid);
  document.location.href = "https://u-meet.herokuapp.com/roomProfilePage";
});

// Log Out Button
let logoutButton = document.getElementById("logOut");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("roomid");
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  document.location.href = "https://u-meet.herokuapp.com/";
});
