'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const DBAbstraction = require('./DBAbstraction');
const db = new DBAbstraction('./data/bingo.sqlite');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

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