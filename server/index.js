'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const express = require('express');
let http = require('http');
let fs = require('fs');
const path = require('path');
const dblast = require("./database.js");
const app = express();

app.use(express.json()); // lets you handle JSON input
app.use(express.static('client/')); // specify the directory 

// connect HTML frontend to server backend 
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./client/login.html'));
});

app.get('/profilePage', (req, res) => {
    res.sendFile(path.resolve('./client/userProfile.html'));
});

app.get('/bookingPage', (req, res) => {
    res.sendFile(path.resolve('./client/createBooking.html'));
});

app.get('/roomProfilePage', (req, res) => {
    res.sendFile(path.resolve('./client/roomProfile.html'));
});

// creating API endpoints 
app.post("/deleteUser", async (req, res) => {
    const data = req.body;
    await dblast.delUser(data.email);
});

app.post('/getRoomById', async (req,res) => {
    const data = req.body;
    res.send(JSON.stringify(await dblast.getRoomID(data.building)));
});

app.post('/editInfo', async (req,res) => {
    const data = req.body;
    await dblast.updateUserFirstName(data.firstname, data.password);
    await dblast.updateUserLastName(data.lastname, data.password);
    await dblast.updateUserEmail(data.email, data.password);
});

app.get('/deleteProfile', (req, res) => {
    console.log("deleted user profile!");
});

// browser url http://localhost:3000/login
app.get('/login', (req, res) => {
    console.log("Login Succeeded!");
    res.sendFile(path.resolve('./client/userProfile.html'));
});

// curl -d '{ "email" : "x", "password" : "X", "firstName" : "x", "lastName" : "x", "userId" : "7", "groups" : ["Esports club"], "previousBookings" : [1], "upcomingBookings" : [2]}' -H "Content-Type: application/json" http://localhost:3000/createAccount
app.post('/createAccount', async (req, res) => {
    const data = req.body;
    await dblast.addUser(data.firstname, data.lastname, data.email, data.password, data.previousbookings, data.upcomingbookings);
    console.log(`Created new account successfully!`);
});

// browser url http://localhost:3000/userInfo?userId=1
app.post('/userInfo', async (req, res) => {
    const data = req.body;
    res.send(JSON.stringify(await dblast.getUserByEmail(data.email)));
});

// https://www.codegrepper.com/code-examples/javascript/app.delete%28%29+express
// browser url http://localhost:3000/deleteAccount?userId=1
app.delete('/users/:id', (req, res, next) => {
    const expressionIndex = getIndexById(req.params.id, expressions);
    if (expressionIndex !== -1) {
      expressions.splice(expressionIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

  // curl -d '{ "email" : "x", "password" : "X", "firstName" : "x", "lastName" : "x", "userId" : "5", "groups" : ["Esports club"], "previousBookings" : [1], "upcomingBookings" : [2]}' -H "Content-Type: application/json" http://localhost:3000/createAccount
app.post('/deleteAccount', (req, res) => {
    data["users"].pop(req.body.user);
    console.log(`Deleted account successfully!`);
});

// Gather Room Information 
app.post('/roomInformation', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomInformation(data.roomid)));
});

/*
* Room objects don't currently have isAvailable attribute
* Once that is added we can simply check to see if the attribute
*   is true and push it to an array.
app.get('/availableRooms', (req, res) => {
    let availableRooms = [];
    for (let i = 0; i < data["rooms"]; ++i) {
        if (data["rooms"][i].isAvailable) 
    
    }
});
*/

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });

const port = 3000; // specify the port 
app.listen(process.env.PORT || port);