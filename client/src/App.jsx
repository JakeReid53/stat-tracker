import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Players from './components/Players.jsx';
import Buttons from './components/buttons.jsx';
import GameSelect from './components/gameselect.jsx';

  var Grid = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: 10% 80% 10%;
    grid-template-areas:
    'header header'
    'play menu'
    'footer footer';
    gap: 10px;
    background-color: #556144;
    padding: 10px;
    height: 100vh;
  `;
  var TitleWrapper = styled.div`
    grid-area: header;
    background-color: #40171d;
  `;
  var Play = styled.div`
    grid-area: play;
    background-color: #40171d;
  `;
  var ButtonWraper = styled.div`
    grid-area: menu;
    background-color: #40171d;
  `;
  var Footer = styled.div`
    grid-area: footer;
    background-color: #40171d;
  `;
  var Title = styled.h1`
    text-align: center;
    margin: auto;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to bottom right, #F9F295, #E0AA3E, #E0AA3E, #B88A44);
    color: transparent;

    background-size: 300%;
    background-position: -100%;

    animation: animatedtext 20s infinite;

  @keyframes animatedtext {
    from{
      background-positon: 0%
    }
    to{
      background-position: 100%
    }
  }
  `;
  var Head = styled.h2`
    text-align: center;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to bottom right, #F9F295, #E0AA3E, #E0AA3E, #B88A44);
    color: transparent;

    background-size: 300%;
    background-position: -100%;

    animation: animatedtext 20s infinite;

  @keyframes animatedtext {
    from{
      background-positon: 100%
    }
    to{
      background-position: 0%
    }
  }

  `;

function compareNumbers(a, b) {
  return b.init - a.init;
}
var App = () => {
  // setup game id and tell when to prompt to change game.
  var up = 0;
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [gameName, setGameName] = useState(false);
  function next() {
    if (turn >= players.length - 1) {
      setTurn(0);
      setUpdate(0);
    } else {
      setTurn(turn + 1);
      setUpdate(turn + 1);
    }
  }
  function setUpdate(nex) {
    axios({
      method: 'put',
      url: 'http://localhost:3000/games',
      data: {
        turn: nex
      }
    })
  }
  function updTurn() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/games',
      params: {
        name: gameName
      }
    })
    .then((res) => {
      setTurn(res.data.turn);
    });
  }
  function upd() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/players',
      params: {
        game: gameName
      }
      })
      .then(resu => {
        setPlayers(resu.data.sort(compareNumbers));
      });
  }
  useEffect(() => {
    if(!!gameName) {
      upd();
      updTurn();
    }
  }, [gameName]);

  if (!gameName) {
    return <GameSelect setGameName={setGameName}/>
  } else {
    return (
      <Grid>
        <TitleWrapper>
          <Title>Stat Tracker</Title>
        </TitleWrapper>
        <Play>
          <Head>Players</Head>
          <Players players={players} setGame={ upd } turn={turn} setUpdate={setUpdate} setTurn={setTurn}/>
        </Play>
        <ButtonWraper>
          <Head>Menu</Head>
          <Buttons setGame={upd} next={next} gameName={gameName} />
        </ButtonWraper>
        <Footer></Footer>
      </Grid>
    );
  }
}

export default App;