'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();

const express = require('express');
const app = express();
let http = require('http');
let fs = require('fs');
const path = require('path');
const passport = require('passport'); // handles authentication
const expressSession = require('express-session');  // for managing session state 
const passportLocal = require('passport-local'); // username/password strategy
const dblast = require("./database.js");
const minicrypt = require('./miniCrypt');
const mc = new minicrypt();

// passport configuration
const LocalStrat = passportLocal.Strategy;
const session = {
     secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
     resave: false,
     saveUninitialized: false
 };

 const getSaltHashOf = async (email) => {
    try {
        let user = await dblast.getUserByEmail(email);
        const passwordString = user[0]["password"];
        return passwordString.password.split(','); // returns an array with element 0 as the the salt and element 1 as the hash
    } catch(e) {
        return undefined;
    }
};

const strategy = new LocalStrat({usernameField: 'email', passwordField: 'password'},
    async (email, pass, done) => {
        if (await getSaltHashOf(email) === undefined) {
            return done(null, false, {'message' : 'No user with that email exists'});
        }
        if (!(await checkPass(email, pass))) {
            await new Promise((r) => setTimeout(r, 2000)); // This does not stop parallel requests from being sent. A more secure method might be an account-wide retry counter but this implementation was not covered in the scope of the class
            return done(null, false, { 'message' : 'Incorrect password' });
        }
        return done(null, email);
    });

// app configurations
app.use(express.static('client/')); // specify the directory
app.use(express.json()); // lets you handle JSON input

// convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ 'extended': true }));

const mustBeAuthenticated = async(req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');

const userExists = async email => await getSaltHashOf(email) !== undefined;

const userInfo = async email => {
    if(!(await userExists(email))) {
        return undefined;
    }
    const saltHash = await getSaltHashOf(email);
    return {
        salt: saltHash[0],
        hash: saltHash[1]
    };
};

const checkPass = async (email, pass) => {
    const credInfo = await userInfo(email);
    if(credInfo === undefined) {
        return false;
    }
    return miniCrypt.check(pass, credInfo.salt, credInfo.hash);
};

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
app.get('/login', mustBeAuthenticated, (req, res) => {
    console.log("Login Succeeded!");
    res.sendFile(path.resolve('./client/userProfile.html'));
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

// curl -d '{ "email" : "x", "password" : "X", "firstName" : "x", "lastName" : "x", "userId" : "7", "groups" : ["Esports club"], "previousBookings" : [1], "upcomingBookings" : [2]}' -H "Content-Type: application/json" http://localhost:3000/createAccount
app.post('/createAccount', async (req, res) => {
    const data = req.body;
    console.log("password input: " + data.password);
    console.log("hash: " + mc.hash(data.password));
    const [salt, hash] = mc.hash(data.password);
    await dblast.addUser(data.firstname, data.lastname, data.email, [salt, hash], data.previousbookings, data.upcomingbookings);
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

app.post('/createBooking', async (req, res) => {
    const data = req.body;
    await dblast.addBooking(data.building, data.date, data.email, data.time);
    console.log(`Created new booking successfully!`);
});

// Gather Room Information 
app.post('/roomInformation', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomInformation(data.roomid)));
});

app.get('/allRooms', async (req,res) => {
    res.send(JSON.stringify(await dblast.getAllRooms()));
})

app.post('/dateInformation', async (req, res) => {
    const data = req.body;
    res.send(JSON.stringify(await dblast.getDate(data.roomid)));
});

app.post('/updateDate', async (req, res) => {
    const data = req.body;
    res.send(JSON.stringify(await dblast.updateDate(data.date, data.roomid)));
});

app.post('/bookingInformation', async (req, res) => {
    const data = req.body;
    res.send(JSON.stringify(await dblast.getBookingInformation(data.email)));
});

app.get('/getAbove3Stars', async (req, res) => {
    res.send(JSON.stringify(await dblast.getAbove3Stars()));
})

app.get('/getLargeCapacity', async (req, res) => {
    res.send(JSON.stringify(await dblast.getLargeCapacity()));
})

app.get('/getMediumCapacity', async (req, res) => {
    res.send(JSON.stringify(await dblast.getMediumCapacity()));
})

app.get('/getTechRooms', async (req, res) => {
    res.send(JSON.stringify(await dblast.getTechRooms()));
})

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });

const port = 3000; // specify the port 
app.listen(process.env.PORT || port);