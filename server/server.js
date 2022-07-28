const express = require('express');
const path = require('path');
const { putTurn,  getPlayers, delPlayer, player, getGame, postGame, getGames} = require('./controlers.js');


const app = express();

app.use(express.static(path.join(__dirname, "..", "/client/dist")));
app.use(express.json());

app.get('/all', getGames);
app.post('/games', postGame);
app.get('/games', getGame);
app.put('/games', putTurn);
app.get('/players', getPlayers);
app.post('/players', player);
app.delete('/players', delPlayer);

console.log("Listening on PORT: ", 3000);
app.listen(3000);