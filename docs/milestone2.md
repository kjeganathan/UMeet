# Milestone #2

### Overview
- The team name: team-eta
- The application name: UMeet

### Team Overview 
- Name: Kavya Jeganathan, Github: kjeganathan
- Name: Laura Nepo, Github: lauranepo
- Name: Disha Srivastava, Github: dishsrivastava

## Representation of APIs

![image](https://user-images.githubusercontent.com/26130113/140625211-4fb9bbb5-75fd-4421-88e1-cf2e085bd0a8.png)

We created multiple endpoints for two objects: users and rooms. For users, we had two GET methods, login (/userLogin) and userInfo (/userInfo), one POST method, createAccount (/createaccount/new), and one DELETE method, deleteAccount (/user/delete). For rooms, we had three GET requests, findByName (/room/findByName), roomProfile (/room/roomProfile), and availableRooms (/room/availableRooms).

## Client Interface

### CREATE
![image](https://user-images.githubusercontent.com/26130113/140625606-ee84ac61-cc73-4fbd-969d-9241bcf1b71e.png)

The Create Account section of the login page creates a user object in JSON file.

![image](https://user-images.githubusercontent.com/26130113/140625621-d81402ea-5caa-4721-a36f-42fa3dac41e4.png)

![image](https://user-images.githubusercontent.com/26130113/140625626-e51f3f77-7b5b-4093-a41c-80d7cff89b2b.png)

An alert is displayed to confirm that an account has been created.

Example of backend response:

![image](https://user-images.githubusercontent.com/26130113/140626127-543fa2f8-e6e8-4e79-b3dc-3bdfc4066d28.png)

### READ

We are reading in user and room information from data.json to populate profilePage and roomProfilePage. We have created multiple API calls to GET() user information and room information based on given parameters such as a roomId or a userId. Here is an example of the API calls: 

<img width="300" alt="Screen Shot 2021-11-06 at 4 20 37 PM" src="https://user-images.githubusercontent.com/20649388/140626632-df8e4bd7-37fb-464a-930e-f0bb2e193067.png">

We have created two different ways to grab room information, through quering a roomId and or findByName(). The roomProfile() API calls allows you to find a specific room and its information with a given roomID. 

<img width="300" alt="Screen Shot 2021-11-06 at 4 22 17 PM" src="https://user-images.githubusercontent.com/20649388/140626670-a1b7087a-54ca-4160-b6d4-3201433eef8e.png">

The findByName() API call allows you to find a specific room and its information with a given roomName, which will help us populate our bookingPage for Milestone 3, and the upcoming/past bookings on the user profile page. Here is an example of a successful request: 

<img width="1040" alt="Screen Shot 2021-11-06 at 4 30 39 PM" src="https://user-images.githubusercontent.com/20649388/140626849-7e008bf8-5e47-4a14-be22-87e71c85d9a7.png">




### UPDATE
For the update functionality, users can edit their profile directly on the user profile page.

![image](https://user-images.githubusercontent.com/26130113/140625764-b5efa66d-07be-4f07-af59-bdd5d52350d1.png)

![image](https://user-images.githubusercontent.com/26130113/140625771-fcaba698-0228-4ca9-8bee-6327ae43acff.png)

When the "Edit Profile" button is clicked, the user information is updated in the JSON file.

![image](https://user-images.githubusercontent.com/26130113/140625780-5c1c004a-e3fa-43fb-b971-e0e10209ba6b.png)

![image](https://user-images.githubusercontent.com/26130113/140626608-8e674f18-e34d-4ad3-9d83-17331e0dcee1.png)
(Our delete button functions to redirect the user and calls the delete API)

Example of backend response:

![image](https://user-images.githubusercontent.com/26130113/140626127-543fa2f8-e6e8-4e79-b3dc-3bdfc4066d28.png)


### DELETE

We have multiple delete API calls currently. For future milestones, we are planning on optimizing the delete functionality by using the user and room IDs. When the user clicks "Delete User",  the user is redirected to the login page, as that user's credentials no longer exist.

Example of backend response: 

![image](https://user-images.githubusercontent.com/26130113/140626413-0bdc5fba-0d08-4930-b6e0-2cea33811434.png)



## Heroku URL
https://u-meet.herokuapp.com/
