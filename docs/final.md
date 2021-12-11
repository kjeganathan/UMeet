### 1. Title
Team-eta

### 2. Subtitle
UMeet

### 3. Semester
Fall 2021

### 4. Overview
UMeet is a web application used to book meeting/event spaces around campus, specifically for student organizationsand RSO's to book classrooms more easily. This web app will include functionality for users to create an account, view available meeting rooms, learn details about each room, and book a room for a specific date and time slot. 

There is an existing web application for booking group study rooms in the W. E. B. Du Bois Library (https://libcal.library.umass.edu/reserve/groupstudyrooms). However, these rooms provided by the library have a maximum capacity 6-8 students which are too small for RSO and student organization meetings. If a student organization in CICS or a campus RSO would like to book a classroom for meetings in the Integrated Learning Center, Isernberg School of Management Building, or any other classroom building on campus, they currently have to go through an extensive process of reaching out to CCM administration or submitting an application to Campus Pulse. 

Our goal is to create a standardized and efficent web platform which will make it easier for student organizations and RSOs to book meeting spaces in order to host their events in a standardized and articulate manner.

## 5. Team Overview 
- Name: Kavya Jeganathan, Github: kjeganathan
- Name: Disha Srivastava, Github: dishsrivastava
- Name: Laura Nepo, Github: lauranepo

## 6. User Interface 
| UI View                   | Purpose |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Login / Create an Account | This page enables a user to login to the web platform or create an account. |
| Book a Room               | This page provides a user with an overview of the available classrooms and their corresponding time slots.   Additionally, a user can filter based on a few popular features such as capacity, ratings, and technology access.   A user can select "Details" to be directed to the Room Profile Page or select "Pick a Date" to be prompted with a modal popup to select a date and make a booking. |
| Room Profile              | This page provides a holistic overview of each room, so that a student can verify the rooms capabilities before creating a booking.   The room details available to view include: room type, rating, attendee capacity, technology available, building acronym, specific room tags, and finally, a room address and Google Maps API integration.                                                            |
| User Profile              | This page allows a user to view all the previous and upcoming bookings associated with their account.   In addition, they can edit account details (such as name and email) and delete their account.                                                                                                                                                                                               |

Here are a few screenshots of our UI views:
| UI View           | Visual | 
|-------------------|-----------|
| Login / Create an Account | <img width="1440" alt="Screen Shot 2021-12-11 at 3 59 24 PM" src="https://user-images.githubusercontent.com/20649388/145692247-029a96bd-3aa7-41f7-b6ad-45355e8be5de.png"> |
| Book a Room Overview | <img width="1440" alt="Screen Shot 2021-12-11 at 4 00 53 PM" src="https://user-images.githubusercontent.com/20649388/145692252-34088d5d-2eb5-444c-ad8f-969130df5a46.png"> | 
| Book a Room => Pick a Date | <img width="542" alt="Screen Shot 2021-12-11 at 4 29 28 PM" src="https://user-images.githubusercontent.com/20649388/145692269-b1dbb4fc-b2cc-49c1-8ae2-9cd0f965a750.png"> |
| Room Profile | <img width="1440" alt="Screen Shot 2021-12-11 at 4 02 11 PM" src="https://user-images.githubusercontent.com/20649388/145692285-6a3c5474-dfc2-4c58-af65-178dff1221b3.png"> | 
| Room Profile => Further Details | <img width="1440" alt="Screen Shot 2021-12-11 at 4 02 22 PM" src="https://user-images.githubusercontent.com/20649388/145692296-fdff8bd5-62ca-4194-8f92-2c317201f8ec.png"> | 
| User Profile | <img width="1440" alt="Screen Shot 2021-12-11 at 4 33 23 PM" src="https://user-images.githubusercontent.com/20649388/145692324-72f88491-3d5d-4099-9fcb-296625698f8b.png"> | 
| User Profile => Bookings | <img width="1439" alt="Screen Shot 2021-12-11 at 4 34 12 PM" src="https://user-images.githubusercontent.com/20649388/145692338-3ca9cc9d-bb96-4b8e-8692-919110be7462.png"> | 





## Heroku Link
https://u-meet.herokuapp.com/

## Our APIs
RESTful APIs

| Route               |  Description                                                                                                 |
|---------------------|--------------------------------------------------------------------------------------------------------------|
| /deleteUser         |  deletes a user from user table in the database                                                              |
| /editInfo           |  edits a user's information like email and name                                                              |
| /login              |  performs authentication, if not registered redirects to login page, else takes user to profile page         |
| /logout             |  logs out signed in user, redirects to login page and emptys local storage                                   |
| /createAccount      |  adds a new user to user table in the database                                                               |
| /createBooking      |  adds a new booking to booking table in the database                                                         |
| /userInfo           |  gets a user's information based on email froom the useres table in the database                             |
| /roomInformation    |  gets a room's information based on roomid from the rooms table in the database                              |
| /allRooms           |  gets all the rooms stored in the rooms table in the database                                                |
| /dateInformation    |  gets date of room booked based on roomid from the rooms table in the database                               |
| /updateDate         |  updates the date array of the rooms table in the database                                                   |
| /bookingInformation |  gets a booking's information based on email of the user making the booking from the bookings database table |
| /getAbove3Stars     |  filters all rooms in the rooms database table based on having above 3 stars                                 |
| /getLargeCapcity    |  filters all rooms in the rooms database table based on having above or equal to 100 capacity                |
| /getMediumCapcity   |  filters all rooms in the rooms database table based on having less than 100 capacity                        |
| /getTechRooms       |  filters all rooms in the rooms database table based on having technology enabled                            |
| *                   |  indicates error                                                                                             |

## Our Database
We used a PostgreSQL database for this project. 
### Users Table
| Column            | Data Type | Description                       |
|-------------------|-----------|-----------------------------------|
| email             | text      | The email of the user             |
| first name        | text      | The first name of the user        |
| last name         | text      | The last name of the user         |
| password          | text      | The password of the user          |
| userid            | int4      | The user ID of the user           |
### Rooms Table
| Column            | Data Type | Description                       |
|-------------------|-----------|-----------------------------------|
| address           | varchar   | The address of the room           |
| building          | varchar   | The building name of the room     |
| building\_acronym | varchar   | The building acronym of the room  |
| capacity          | int4      | The capacity of the room          |
| is\_booked        | varchar   | The booking status of the room    |
| rating            | int4      | The rating of the room            |
| room              | varchar   | The room number                   |
| roomid            | int4      | The room ID of the room           |
| tags              | varchar   | The tags of the room              |
| tech              | varchar   | The tech of the room              |
| type              | varchar   | The type of the room              |
| time              | varchar   | The time the room is available    |
| date              | text[]    | The dates the room is booked      |
### Bookings Table
| Column            | Data Type | Description                       |
|-------------------|-----------|-----------------------------------|
| bookingid         | int4      | The booking id of the booking     |
| building          | varchar   | The building name of the booking  |
| date              | varchar   | The date the booking is made for  |
| email             | varchar   | The booking user's email          |
| time              | varchar   | The time the booking is made for  |

## Contributions
- Disha: Collected data for on-campus room information from multiple UMass information repositories and compiled into one CSV file, then parsed CSV file into Heroku database to create rooms table, also created database connections and completed backend endpoints + functionality for roomProfilePage, finally, added client-side connections to the server for roomProfilePage
- Kavya: Created database connections and completed backend endpoints + functionality for userProfilePage and logIn page, added client-side connections to the server for userProfilePage and logIn page, finalized Heroku database connection, and created user table in db and connected user table to logIn page 
- Laura: Worked on milestone 3 documentation as well as working on creating linkage between bookingPage and roomProfilePage 

## Milestone Overview

We created the PostgreSQL database and connected it to our Heroku app. From there, we finalized all of the CRUD operations for our application. roomProfile.js and userProfile.js both pull information from the database dependent on the roomid/userid saved in local storage. 

Here are a few exmaples of CRUD operations we have implemented: 

- Create: create a new user
- Read: read all room information from the database such as building name, room, popular features, tags, etc. 
- Update: update user information through editing
- Delete: delete a user from the database

Visual Examples: 

#### i. Create Account: A user can create an account with their first name, last name, email, and password, and then be added to the Heroku PostgreSQL DB users table in the database.
<img width="480" height="680" src="https://user-images.githubusercontent.com/68821572/143328601-0f4c8a96-68c8-41a4-9202-746d648dc022.png">

#### ii. User Profile: The user email and name can be edited inline, which will update the database. The user can also be deleted from this page.
<img width="480" src="https://user-images.githubusercontent.com/68821572/143328610-9f100857-8a34-4283-8537-b2d4b0add067.png">

#### iii. Room Profile: The room and building information is pulled from the database, including tags, room and building name, and popular features (and more).
<img width="680" src="https://user-images.githubusercontent.com/26130113/143325801-ffab709e-7f07-4dba-988f-1efd39907f9f.png">


### Database Screenshots 

To show our rooms database with UMass Amherst campus room information: 
<img width="1141" src="https://user-images.githubusercontent.com/20649388/143328701-ece5a1ea-f6b2-47be-9b58-c5205c1d1318.png">

To show our user database updating in real time: 
<img width="1159" src="https://user-images.githubusercontent.com/20649388/143328732-f3829df0-50b0-4ab1-b703-c63eb53b1ffa.png">


