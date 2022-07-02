const express = require('express');
const path = require('path');
const { putTurn, getTurn, getPlayers, delPlayer, player } = require('./controlers.js');


const app = express();

app.use(express.static(path.join(__dirname, "..", "/client/dist")));
app.use(express.json());

app.get('/games', getTurn);
app.put('/games', putTurn)
app.get('/players', getPlayers);
app.post('/players', player)
app.delete('/players', delPlayer)

console.log("Listening on PORT: ", 3000);
app.listen(3000);