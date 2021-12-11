'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const dblast = require("./database.js");
const path = require('path');

require('dotenv').config();

const express = require('express');
const expressSession = require('express-session');  // for managing session state 
let session = require('express-session');
const passport = require('passport');                     // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const app = express();
const bcrypt = require('bcrypt');

// session configuration
session = {
    secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave: false,
    saveUninitialized: false
};

// passport configuration
const strategy = new LocalStrategy(
    async (username, password, done) => {
        console.log("hello");
        if (!findUser(username)) {
            console.log('no user');
            return done(null, false, { 'message': 'Cannot find user' });
        }
        if (!validatePassword(username, password)) {
            console.log('password wrong');
            await new Promise((r) => setTimeout(r, 2000));
            return done(null, false, { 'message': 'Incorrect password' });
        }
        console.log('ok');
        return done(null, username);
    }
);

// app configuration
app.use(expressSession(session));
//app.use(express.bodyParser());
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});

// convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

app.use(express.json()); // lets you handle JSON input
app.use(express.static('client/')); // specify the directory
app.use(express.urlencoded({ 'extended': true })); // allow URLencoded data

async function findUser(email) {
    const exists = await dblast.getUserByEmail(email);
    console.log(exists);
    console.log("exists");
    if (exists.length === 0) {
        return null;
    } else {
        return exists[0];
    }
}

async function validatePassword(email, password) {
    const exists = await findUser(email);
    if (!exists) {
        return false;
    }
    console.log("compare passwords");
    const res = await bcrypt.compare(password, exists[0].password);
    return res;
}

function checkLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log("authenticated");
        next();
    } else {
        console.log('not');
        res.redirect('/login');
    }
}

// creating API endpoints 
// connect HTML frontend to server backend 
app.get('/', checkLoggedIn, (req, res) => {
    res.redirect('/login');
});

app.get('/profilePage', checkLoggedIn, (req, res) => {
    res.sendFile(path.resolve('./client/userProfile.html'));
});

app.get('/bookingPage', checkLoggedIn, (req, res) => {
    res.sendFile(path.resolve('./client/createBooking.html'));
});

app.get('/roomProfilePage', checkLoggedIn, (req, res) => {
    res.sendFile(path.resolve('./client/roomProfile.html'));
});

app.post("/deleteUser", async (req, res) => {
    const data = req.body;
    await dblast.delUser(data.email);
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


app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./client/login.html'));
});


app.post('/login', 
    passport.authenticate('local', {
        'successRedirect': '/profilePage',
        'failureRedirect': '/login'
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

app.get('/createAccount', async (req, res) => {
    res.sendFile(path.resolve('./client/login.html'));
});

// curl -d '{ "email" : "x", "password" : "X", "firstName" : "x", "lastName" : "x", "userId" : "7", "groups" : ["Esports club"], "previousBookings" : [1], "upcomingBookings" : [2]}' -H "Content-Type: application/json" http://localhost:3000/createAccount
app.post('/createAccount', async (req, res) => {
    const data = req.body;
    const exists = await dblast.getUserByEmail(data.email);
    if (exists.length === 0) {
        const hashed = await bcrypt.hash(data.user.password, 10);
        await dblast.addUser(
            data.user.firstName,
            data.user.lastName,
            data.user.email,
            hashed
        );
        console.log("Account created successfully");
        res.redirect('/login');
    } else {
        console.log("Email already in use");
        res.redirect('/login');
    }
});

app.post('/createBooking', checkLoggedIn, async (req, res) => {
    const data = req.body;
    await dblast.addBooking(data.building, data.date, data.email, data.time);
    console.log(`Created new booking successfully!`);
});

app.post('/userInfo', checkLoggedIn, async (req, res) => {
    const data = req.body;
    res.send(JSON.stringify(await dblast.getUserByEmail(data.email)));
});

// https://www.codegrepper.com/code-examples/javascript/app.delete%28%29+express
app.delete('/users/:id', checkLoggedIn, (req, res, next) => {
    const expressionIndex = getIndexById(req.params.id, expressions);
    if (expressionIndex !== -1) {
      expressions.splice(expressionIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

// FIXME fix delete account
// curl -d '{ "email" : "x", "password" : "X", "firstName" : "x", "lastName" : "x", "userId" : "5", "groups" : ["Esports club"], "previousBookings" : [1], "upcomingBookings" : [2]}' -H "Content-Type: application/json" http://localhost:3000/createAccount
app.post('/deleteAccount', checkLoggedIn, (req, res) => {
    data["users"].pop(req.body.user);
    console.log(`Deleted account successfully!`);
});

// Room Building Name 
app.post('/buildingName', async (req, res) => {
    const data = req.body;    
    console.log("this is working"); 
    console.log(data)
    res.send(JSON.stringify(await dblast.getBuildingName(data.roomid)));
});

// Room Name 
app.post('/roomName', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomName(data.roomid)));
});

// Room Rating 
app.post('/roomRating', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomRating(data.roomid)));
});

// Room Capacity 
app.post('/roomCapacity', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomCapacity(data.roomid)));
});

// Room Tech
app.post('/roomTech', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomTech(data.roomid)));
});

// Room Type 
app.post('/roomType', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomType(data.roomid)));
});

// Room Tags 
app.post('/roomTags', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomTags(data.roomid)));
});

// Room Address 
app.post('/roomAddress', async (req, res) => {
    const data = req.body;    
    res.send(JSON.stringify(await dblast.getRoomAddress(data.roomid)));
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

const port = 3000;
app.listen(process.env.PORT || port);