"use strict";

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

      // Implementing logic to render star ratings 
      let starCount = my_booking.rating; 

      /* for(let i = 1; i <= starCount; ++i) {
        document.getElementById("star-" + i).style.color = "#FFFF2E"; 
        console.log("star-" + i);
      } */ 
        
        let meeting_html = `<div class="card" id="card1">
                <div class="card-horizontal">
                    <div class="card-body">
                        <div class="flex-card-title">
                            <!--Card Room Name-->
                            <h4 id="card-building" class="card-title">${my_booking.building}</h4>
                            <!--Card Room Max Capacity-->
                            <p class="card-capacity" id="card-capacty" style="padding-right: 20px">Attendee Capacity: ${my_booking.capacity}</p>
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
                        <p id="card-time" class="card-time card-text">Time Slot: ${my_booking.time}</p>
                        <p id="card-address" class="card-address card-text">Address: ${my_booking.address}</p>
                        <div class="flex-container-buttons">
                            <button style="background-color: grey; color: white" type="button" class="card-button btn btn-secondary" id="${my_booking.roomid}">Details</button>
                            <button type="button" class="card-button btn btn-dark" data-toggle="modal" data-target="#myModal" id="${my_booking.roomid}">Pick Date</button>

                                <div id="myModal" class="modal fade">
                                    <!-- Modal content -->
                                    <div class="my-modal">
                                        <div class="modal-content">
                                            
                                                <div id="flex-modal-head">
                                                    <h4 class="modal-header">Date Selection</h4>
                                                    <button type="button" id=close${my_booking.roomid} class="close">&times;</button>
                                                </div>
                                                <br/>

                                                <!--Date Input Box-->
                                                <div class="modal-body">
                                                <form>
                                                <div class="modalDate">
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
                                                        <input style="width: 165px; name="date" height:30px; margin-top: 4px" type="date" id="inputNavInput"
                                                            class="form-control" placeholder="date" aria-label="date" aria-describedby="basic-addon1">
                                                    </div>
                                                </div>
                                                </form>
                                                </div>
                                                
                                                <div class="modal-footer">
                                                    <button style="background-color: rgba(108, 92, 231, 0.28)" type="button" id="${my_booking.roomid}" class="btn btn-default" data-dismiss="modal">Book</button>
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
      const detailsButton = document.querySelectorAll(".btn-secondary");
      const closeButton = document.querySelectorAll(".close");
      bookingButtons.forEach((button) => {
        button.addEventListener("click", bookMeeting);
      });
      dateButtons.forEach((button) => {
        button.addEventListener("click", datePicker);
      });
      detailsButton.forEach((button) => {
        button.addEventListener("click", bookingDetails);
      });
      closeButton.forEach((button) => {
        button.addEventListener("click", closeModal);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function closeModal(){
    location.reload();
}
// Booking Button
async function bookMeeting(){
    const roomid = this.id;
    localStorage.setItem("roomid", roomid);
}

async function bookingDetails(){
    const roomid = this.id;
    localStorage.setItem("roomid", roomid);
    document.location.href = "http://localhost:3000/roomProfilePage";
}

async function datePicker(){
    const roomid = this.id; // gets the room id
    // let formData = document.querySelector('form-control');
    let email = localStorage.getItem("email"); // gets the email of a user
    let date = document.forms[0].elements[0].value; // gets the date which was picked
    console.log(date);

    let result = await fetch('/dateInformation', { // gets the dates stored in the rooms db
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                roomid: roomid
        })
    });
      // console.log(result);
      let resJSON = await result.json();
      let dateArray = resJSON[0]["date"];
      let isFull = false;
      if(dateArray === null){  // isEmpty date array for a room used if date array in rooms db is empty
        dateArray = [];
        console.log(dateArray);
        console.log("hi");
      }
        // date array is not empty
        for(let i = 0; i<dateArray.length; i++){
              if(dateArray[i] === date){
                  isFull = true;
                  break; // breaks out of the loop if a date picked is already in the db
              }
        }

      // if the date picked is not already in the rooms db for that particular room
      if(isFull === false){
        dateArray.push(date);

        // update the dates array in the rooms db 
        await fetch('/updateDate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    roomid: roomid,
                    date: dateArray
                    
            })
        });

        // get room info for the room we are working with associated with the card
        let roomInfo = await fetch('/roomInformation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    roomid: roomid
            })
        });
    
        let roomInfoJSON = await roomInfo.json();

        // create a booking only if the date picked is not already in the db
        await fetch('/createBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    building: roomInfoJSON[0]["building"],
                    date: date,
                    email: email,
                    time: roomInfoJSON[0]["time"]
            })
        });
        
      }
      else{
          window.alert("Please choose a different date or different room and time, as the room is already booked for that day at the chosen time!");
      }
}


// Log Out Button
let logoutButton = document.getElementById("logOut");
logoutButton.addEventListener("click", () => {
  localStorage.clear();
  document.location.href = "https://u-meet.herokuapp.com/";
});
