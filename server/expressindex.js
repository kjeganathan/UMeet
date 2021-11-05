'use strict';
const express = require('express');
let http = require('http');
let url = require('url');
let fs = require('fs');
const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 3000;

let data = {};
const filename = 'data.json';
data = JSON.parse(fs.readFileSync(filename));

//browser url localhost:3000/login
app.get('/login', (req, res) => {
    res.send(`Login succeeded with status code ${res.statusCode}`);
});

// browser url localhost:3000/userInfo?userId=1
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

// curl -d '{ "email" : "x", "password" : "X", "firstName" : "x", "lastName" : "x", "userId" : "7", "groups" : ["Esports club"], "previousBookings" : [1], "upcomingBookings" : [2]}' -H "Content-Type: application/json" http://localhost:3000/createAccount
app.post('/createAccount', (req, res) => {
    const body = req.body;
    const first = req.body['firstName'];
    const last = req.body['lastName'];
    const id = req.body['userId'];
    data["users"].push(body);
    let strInput = JSON.stringify(data);
    fs.writeFileSync(filename, strInput);
    console.log(`Created new account for ${first} ${last} with id number ${id}`);
    res.send(res.statusCode);
});

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
