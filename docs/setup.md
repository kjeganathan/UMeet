# Source Files

Client:
  - login.js, roomProfile.js, userProfile.js, createBooking.js
  - login.html, roomProfile.html, userProfile.html, createBooking.html
  - login.css, roomProfile.css, userProfile.css, createBooking.css

Server:
  - database.js, index.js

Database Tables:
  - users, rooms, bookings

# Steps to Build the Project

First create a login.html file which will be the first page that the application opens on.  There should be authentication set up for the page which does a check ensuring that the user's password entered into the login page is the same as the user's password stored in the users database table for their account.  The login.html file has the functionality to both create an account for a new user as well as to login to the UMeet application.  When logging into the application, a user is prompted to enter in their email as well as their password.  When creating an account, a user is prompted to enter their first name, last name, email as well as a new password.  After logging into the application successfully, a user is routed to their profile page which is created using a userProfile.html file.

The userProfile.html file as well as userProfile.js file work together to provide information about a user in the application.  The information provided includes a user's name as well as their emails.  It also includes information on a user's room bookings.  There is also a functionality to edit a user's information which is provided through code written in userProfile.js.

A createBooking.html and createBooking.js will also be needed in order to allow for a user to actually book the rooms based on time and date availability.  Also, there should be a filter functionality for filtering booking room cards.

Also, a roomProfile.html file and roomProfile.js file will be needed in order to display room information inclusive of room title, room description, technologies available, location, etc. 

A database.js and index.js file will also be needed. The database.js file will connect the heroku PostgreSQL database.  The database.js file has the queries written in functions, in order to interact with the database tables.  The index.js file has endpoints which call the functions in the database.js file and interact with the javascript files in the frontend.
