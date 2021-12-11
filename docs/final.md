## Title
Team-eta

## Subtitle
UMeet

## Semester
Fall 2021

## Overview
UMeet is a web application used to book meeting/event spaces around campus, specifically for clubs and RSO's to book rooms more easily. This web app will include functionality for users to leave comments on their experience using specific rooms, a rating system, and functionality to view your e-board team bookings. Furthermore, other users can upvote comments.

There is an existing library application in order to book rooms in the library. Since the rooms provided by the library are too small to host large RSO and club groups, these library rooms cannot be used by RSO’s and club’s in order to hold events or meetings.
Instead, we would like to create a platform which will make it easier for clubs and RSOs to book large meeting spaces in order to host their events in a standardized and articulate manner.

## Team Overview 
- Name: Kavya Jeganathan, Github: kjeganathan
- Name: Laura Nepo, Github: lauranepo
- Name: Disha Srivastava, Github: dishsrivastava

## Heroku Link
https://u-meet.herokuapp.com/

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


