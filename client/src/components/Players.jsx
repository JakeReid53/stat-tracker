import React from 'react';
import Player from './Player.jsx';
import styled from 'styled-components';

var Over = styled.div`
  height: 80%;
  overflow: auto;
  background-color: #40171d;
`
// set up player rendering.
var Players = ({players, setGame, turn, setUpdate, setTurn}) => (
  <Over>
    {players.map((player, ind) => (
      <Player key={ind} ind={ind} turn={turn} play={player} setGame={setGame} setUpdate={setUpdate} setTurn={setTurn}/>
    ))}
  </Over>
);

export default Players;