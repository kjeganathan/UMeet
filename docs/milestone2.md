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

### UPDATE
For the update functionality, users can edit their profile directly on the user profile page.

![image](https://user-images.githubusercontent.com/26130113/140625764-b5efa66d-07be-4f07-af59-bdd5d52350d1.png)

![image](https://user-images.githubusercontent.com/26130113/140625771-fcaba698-0228-4ca9-8bee-6327ae43acff.png)

When the "Edit Profile" button is clicked, the user information is updated in the JSON file.

![image](https://user-images.githubusercontent.com/26130113/140625780-5c1c004a-e3fa-43fb-b971-e0e10209ba6b.png)

An alert is displayed to confirm that the changes have been made.

Example of backend response:

![image](https://user-images.githubusercontent.com/26130113/140626127-543fa2f8-e6e8-4e79-b3dc-3bdfc4066d28.png)


### DELETE

Example of backend response: 

![image](https://user-images.githubusercontent.com/26130113/140626413-0bdc5fba-0d08-4930-b6e0-2cea33811434.png)



## Heroku URL
https://u-meet.herokuapp.com/
