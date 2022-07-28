const axios = require('axios');
const { Client } = require('pg');

// Inserts a new game into the db
// function newGame(name, res, client) {
//   client.query(`INSERT INTO games (name) VALUES ($1) RETURNING id`, [name])
//   .then((val) => {
//     res.send(val.rows[0]);
//     client.end();
//   });
// }
module.exports = {
  // findes if game name exsists otherwise creates it
  postGame: (req, res) => {
    var client = new Client({
      host: 'localhost',
      database: 'mvp',
      port: 5432
    });
    client.connect();
    client.query(`INSERT INTO games (name, turn, disc) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT games_name_key DO NOTHING`, [req.body.name, req.body.turn, req.body.disc])
    .then(resu => {
      res.send();
    });
  },

  getGames: (req, res) => {
    var client = new Client({
      host: 'localhost',
      database: 'mvp',
      port: 5432
    });
    client.connect();
    client.query(`SELECT * FROM games`)
    .then(resu => {
      res.send(resu.rows);
      client.end();
    });
  },

  getGame: (req, res) => {
    var client = new Client({
      host: 'localhost',
      database: 'mvp',
      port: 5432
    });
    client.connect();
    client.query(`SELECT * FROM games WHERE name = $1`, [req.query.name])
    .then(resu => {
      res.send(resu.rows[0]);
      client.end();
    });
  },

  putTurn: (req, res) => {
    var client = new Client({
      host: 'localhost',
      database: 'mvp',
      port: 5432
    });
    client.connect();
    client.query(`UPDATE games SET turn = $1 WHERE name = $2`, [req.body.turn, req.body.name])
    .then(() => {
      res.send();
      client.end();
    });
  },

  // gets all players with game_id
  getPlayers: (req, res) => {
    var client = new Client({
      host: 'localhost',
      database: 'mvp',
      port: 5432
    });
    client.connect();
    client.query(`SELECT * FROM players WHERE game = $1`, [req.query.game])
      .then(resu => {
        res.send(resu.rows);
      });
  },

  // inserts/updates player that has name
  player: (req, res) => {
    var client = new Client({
      host: 'localhost',
      database: 'mvp',
      port: 5432
    });
    client.connect();
    client.query(`INSERT INTO players (init, health, name, game) VALUES ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT players_name_key DO UPDATE SET init = $1, health = $2`, [req.body.init, req.body.health, req.body.name, req.body.game])
    .then(resu => {
      res.send();
    });
  },

  // delete players from db
  delPlayer: (req, res) => {
    var client = new Client({
      host: 'localhost',
      database: 'mvp',
      port: 5432
    });
    client.connect();
    client.query(`DELETE FROM players WHERE name = $1`, [req.query.name])
    .then(() => {
      res.send();
      client.end();
    })
    .catch(err => {
      console.log(err);
    });
  }
}