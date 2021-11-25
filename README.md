# UMeet

### Innovative Idea

UMeet is a web application used to book meeting/event spaces around campus, specifically for clubs and RSO's to book rooms more easily.  This web app will include functionality for users to leave comments on their experience using specific rooms, a rating system, and functionality to view your e-board team bookings.  Furthermore, other users can upvote comments.

There is an existing library application in order to book rooms in the library.  Since the rooms provided by the library are too small to host large RSO and club groups, these library rooms cannot be used by RSO’s and club’s in order to hold events or meetings.  
Instead, we would like to create a platform which will make it easier for clubs and RSOs to book large meeting spaces in order to host their events in a standardized and articulate manner.

### Important Concepts

For reference: *user* is a representation of a student who is part of a student organization.

- 🔑 functionality #1: A user can create an account and log in to UMeet, storing all their past room bookings, reviews, and can join specific club’s or RSO'sgroups. When creating an account, the user will be prompted to submit the email of their club’s or RSO's assigned faculty advisor, and the faculty advisor will be notified via email of this request. If the faculty advisor approves the user’s request, they will be added to UMeet.   

- 🔑 functionality #2: Users can view all available classrooms and event spaces on campus at a specific date and time, and book spaces directly on UMeet. Since users are approved during account creation, once they are approved and on the platform they can directly book event spaces. Users are sent an email confirmation once their room is booked. 

- 🔑 functionality #3: Users can leave comments for each room and include tags such as accessibility, environment & surroundings, technology access, size (ex. 20+, 50+, 75+, 100+), room type (ex. lecture, TBL, event space). 

- 🔑 functionality #4: Users can see if other e-board members have booked a room.  Furthermore, all e-board members receive confirmation email when a room is booked.  

- 🔑 functionality #5: Users can search/filter through the rooms available based on criteria like time and size.  

### Data Interactions
- User Information Data: We have a login system in our project UMeet, which requires a user to enter their email and a password. Due to this, their email and password will be stored and linked to their account. Other user data, such as clubs and organizations, previous and upcoming room bookings, and the student's advisor will also be associated with the user. 
- Room Building Data: Each room will have data regarding the room name, number, building, capacity, description and rating.
    - Room Rating Data: Each rating for a room will be made as the average of ratings made by users for the particular room.
    - Current Bookings / Upcoming Availabilties Data: When users complete a booking submission, the specific times and dates of the booking, along with the user/organization that made the booking, will be associated with the room.

### Wireframes
We started our wireframe diagram process by hand-drawing our wireframes, and then translated the hand-drawings to Figma for more refined wireframes.

###$ Page 0: Log In / Create an Account Page 
Our log-in page requires a user to enter an email and password to log in. Alternatively, if the user does not yet have an account, they can create one.
<img width="1345" alt="Screen Shot 2021-10-23 at 9 26 46 PM" src="https://user-images.githubusercontent.com/68821572/138576385-64b0dff6-9caf-4020-bb20-50d2e980d377.png">


#### Page 1: User Profile 
The user profile page will allow students to view their account, their personal information such as their assigned advisor and student organizations, and their upcoming room bookings. 
![studentProfilePage mockup wireframe](https://user-images.githubusercontent.com/26130113/138576330-4334e846-19f6-4560-b2c3-74b00d09a4cf.JPG)
![studentProfilePage](https://user-images.githubusercontent.com/68821572/138576270-4171f253-563e-4f79-af72-0381c57a2bc7.png)


#### Page 2: Room Profile Page 
The room profile page will provide a hollistic overview of a room avaiable for booking. This includes a short description, building and Google Maps location, popular amenities, filter tags, and images. 
![Room Profile Page mockup wireframe](https://user-images.githubusercontent.com/26130113/138576242-6149f9a6-60cb-4b66-bb31-aa8752ec4b41.JPG)
![roomProfilePage](https://user-images.githubusercontent.com/68821572/138576285-c74d0cfd-c943-4d80-b465-fff87fd0073e.png)


#### Page 3: Main Room Bookings Page 
The main bookings page will allow a user to search for available rooms based on certain input parameters, while also filtering on parameters we provide. 
![roomBookingPage mockup wireframe](https://user-images.githubusercontent.com/26130113/138576362-7694612f-448c-4c31-8974-1fe8f99a04a9.JPG)
<img width="1281" alt="Screen Shot 2021-10-23 at 9 26 28 PM" src="https://user-images.githubusercontent.com/68821572/138576387-63397d8c-7eea-4713-9a77-01873e1623bd.png">


## Part 2: HTML and CSS

### Page 0: Log In / Create an Account Page 

We changed some of the color palette being used in the figma wireframe diagram for the login page when we coded it.  We also used bootstrap grid in order to create the main part of this page.

<img width="1677" alt="Screen Shot 2021-10-23 at 8 11 32 PM" src="https://user-images.githubusercontent.com/68821572/138576145-295799cd-7fe9-43e7-8e5f-b477c62c0820.png">


### Page 1: Student Profile 

We used bootstrap grid in order to create the body of the student profile page while coding it.  Everything else which was coded was very similar to the figma diagram made.

![studentProfile HTML](https://user-images.githubusercontent.com/26130113/138576374-f3dddeb8-a66f-4352-b7e2-60fc19fa3912.jpg)


### Page 2: Room Profile Page 

We used the bootstrap carousel for creating the image slide show in our room profile page.  For the map, we used iframes when we coded the page.

![rooomProfile HTML](https://user-images.githubusercontent.com/26130113/138576409-b6cce20f-73ef-4402-b2eb-12878158a668.png)


### Page 3: Main Room Bookings Page 

We used bootstrap icons extensively while coding the main room bookings page.

<img width="1680" alt="Screen Shot 2021-10-23 at 4 44 52 PM" src="https://user-images.githubusercontent.com/68821572/138576155-9932d07a-bb77-4f6b-aa05-9c75dd248234.png">


### Contributors  
- Name: Kavya Jeganathan, Github: kjeganathan
- Name: Laura Nepo, Github: lauranepo
- Name: Disha Srivastava, Github: dishsrivastava
