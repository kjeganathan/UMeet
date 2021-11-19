'use strict';

const express = require('express');
let http = require('http');
let url = require('url');
let fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // lets you handle JSON input

// const port = 3000; // specify the port 

app.use(express.static('client/')); // specify the directory 

let data = {};
const filename = 'data.json';
data = JSON.parse(fs.readFileSync(filename));

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

app.get('/editInfo', (req,res) => {
    console.log("User Info has been updated");
    res.send();
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
app.post('/createAccount', (req, res) => {
    data["users"].push(req.body.user);
    let strInput = JSON.stringify(data);
    fs.writeFileSync(filename, strInput);
    console.log(`Created new account successfully!`);
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
    // let strInput = JSON.stringify(data);
    // fs.writeFileSync(filename, strInput);
    console.log(`Deleted account successfully!`);
});

// browser url http://localhost:3000/findByName?roomName=N211
app.get('/findByName', (req, res) => {
    const k = req.query["roomName"];
    // console.log(k);
    for(let i = 0 ; i < data["rooms"].length; ++i){
        // console.log(i);
        // console.log(data["rooms"][i].roomName);
        if(k === (data["rooms"][i].roomName)) {
            // console.log("reached inside if statement");
            console.log(data["rooms"][i]);
            res.send(data["rooms"][i]);
        }
    }
    res.send();
});

// browser url http://localhost:3000/roomProfile?roomId=1
app.get('/roomProfile', (req, res) => {
    const k = req.query["roomId"];
    // console.log(k);
    for(let i = 0 ; i < data["rooms"].length; ++i){
        if(k === JSON.stringify(data["rooms"][i].roomId)) {
            // console.log(i);
            console.log(data["rooms"][i]);
            res.send(data["rooms"][i]);
        }
    }
    res.send();
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

app.listen(process.env.PORT || port)

// Setting up a database connect 
const pgp = require('pg-promise')();

let config = {
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };

const db = pgp(config);
// console.log(db);

db.connect()
  .then(function (obj) {
    obj.done(); // success, release connection;
    console.log("IT WORKED");
  })
  .catch(function (error) {
    console.log("ERROR:", error.message);
  });

let sql = 'select * from users';
let qrm = pgp.queryResult;