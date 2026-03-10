'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const DBAbstraction = require('./DBAbstraction');
const db = new DBAbstraction('./data/bingo.sqlite');

const app = express();

app.use(session({
    secret: 'Bingo-App',
    resave: false,
    saveUninitialized: true
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

const requiresLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("You must be logged in to access this page.");
    }
};

app.get('/admin', requiresLogin, (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await db.registerUser(username, hashedPassword);
        req.session.user = username;
        res.json({username});
    } catch (err) {
        res.status(500).send("Username might already exist.");
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);
    if (user && await bcrypt.compare(password, user.HashedPassword)) {
        req.session.user = username;
        res.json({username});
    } else {
        res.status(401).send("Invalid credentials.");
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).send("Logout successful.");
    });
});

app.get('/am-i-loggedin', async (req, res) => {
    const loginStatus = {
        loggedIn: false,
        username: ''
    }
    if (req.session.user) {
        loginStatus.loggedIn = true;
        loginStatus.username = req.session.user;
    } 
    res.json(loginStatus);
});


app.get('/ballscalled', async (req, res) => {
    const balls = await db.getBallsCalledByGame(1);
    const numsOnly = []
    balls.forEach(element => {
        numsOnly.push(element.BallNum)
    });
    res.json(numsOnly);
});

app.post('/deletecards', async (req, res) => {
    const gameId = req.body.gameId;

    await db.deleteBallsCalledByGame(gameId);
    await db.deleteCardsByGame(gameId);

    res.json({});
});

app.get('/allcards', async (req, res) => { 
    const allCards = await db.getAllCardsByGame(1);
    res.json(allCards);
}); 
app.post('/allcards', async (req, res) => { 
    const bingoCardStr = req.body.bingoCardStr;
    await db.insertCard(bingoCardStr, 1);
 
    const allCards = await db.getAllCardsByGame(1);
    res.json(allCards);
}); 

app.post('/allcalledballs', async (req, res) => {
    const ballCalled = req.body.ballNum;
    await db.insertBallCalled(ballCalled, 1);
    const allBalls = await db.getBallsCalledByGame(1);
    const allBallNums = allBalls.map(ball => ball['BallNum']);
    res.json(allBallNums);
});

app.use((req, res) => {
    res.status(404).send(`<h2>Uh Oh!</h2><p>Sorry ${req.url} cannot be found here</p>`);
});

db.init()
    .then(() => {
        app.listen(53141, () => console.log('The server is up and running...'));
    })
    .catch(err => {
        console.log('Problem setting up the database');
        console.log(err);
    });