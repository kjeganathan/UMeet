'use strict';
const express = require('express');
let http = require('http');
let url = require('url');
let fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 3000; // specify the port 

app.use(express.static('client/')); // specify the directory 

let data = {};
const filename = 'data.json';
data = JSON.parse(fs.readFileSync(filename));

// connect HTML frontend to server backend 
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./client/loginPage.html'));
});

app.get('/profilePage', (req, res) => {
    res.sendFile(path.resolve('./client/profilePage.html'));
});

app.get('/bookingPage', (req, res) => {
    res.sendFile(path.resolve('./client/bookingPage.html'));
});

app.get('/roomProfilePage', (req, res) => {
    res.sendFile(path.resolve('./client/roomProfilePage.html'));
});

//browser url http://localhost:3000/login
app.get('/login', (req, res) => {
    console.log("Login Succeeded!");
    res.sendFile(path.resolve('./client/bookingPage.html'));
});

// browser url http://localhost:3000/userInfo?userId=1
app.get('/userInfo', (req, res) => {
    const k = req.query["userId"];
    for(let i = 0 ; i < data["users"].length; ++i){
        if(k === JSON.stringify(data["users"][i].userId)){
            console.log(data["users"][i]);
            res.send(data["users"][i]);
        }
    }
    res.send();
});

// browser url http://localhost:3000/roomProfile?roomId=1
app.get('/roomProfile', (req, res) => {
    const k = req.query["roomId"];
    for(let i = 0; i < data["rooms"]; ++i) {
        if (k === JSON.stringify(data["rooms"][i].roomId)) {
            console.log(data["rooms"][i]);
            res.send(data["rooms"][i]);
        }
    }
    res.send();
});

// curl -d '{ "email" : "x", "password" : "X", "firstName" : "x", "lastName" : "x", "userId" : "7", "groups" : ["Esports club"], "previousBookings" : [1], "upcomingBookings" : [2]}' -H "Content-Type: application/json" http://localhost:3000/createAccount
app.post('/createAccount', (req, res) => {
    data["users"].push(req.body.user);
    let strInput = JSON.stringify(data);
    fs.writeFileSync(filename, strInput);
    console.log(`Created new account successfully!`);
});

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
