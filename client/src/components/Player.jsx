import React from 'react';
import styled from 'styled-components';
import { GrDocumentUpdate, GrClose } from 'react-icons/gr';
import { FiDelete } from "react-icons/fi";
import axios from 'axios';


var Wrap = styled.div`
  display: grid;
  background-color: #f7e8ce;
  border-radius: 15%;
  margin-bottom: 20px;
  margin-left: 25px;
  width: 90%;
  height: 100px;
  grid-template-columns: 45% 45% 10%;
  grid-template-rows: 40% 60%;
  grid-template-areas:
  'name name delete'
  'init health update';
`

var True = styled.div`
  display: grid;
  background-color: #f7e8ce;
  border-radius: 15%;
  border-color: red;
  border-style: solid;
  border-width: 5px;
  margin-bottom: 20px;
  margin-left: 25px;
  width: 90%;
  height: 100px;
  grid-template-columns: 45% 45% 10%;
  grid-template-rows: 40% 60%;
  grid-template-areas:
  'name name delete'
  'init health update';
`
var Name = styled.div`
  grid-area: name;
  text-align: center;
  margin: 0px;
  position: relative;
  top: -15px;

`

var Text = styled.h3`
  font-family: Jazz LET, fantasy;
  font-size: 20px;
`

var Init = styled.div`
  grid-area: init;
  text-align: center;
  font-family: Jazz LET;
  font-size: 25px;
`
var Block = styled.span`
  display: block;
`

var Health = styled.div`
  grid-area: health;
  text-align: center;
  font-family: Jazz LET;
  font-size: 25px;
`

var Inp = styled.span`
  text-align: center;
`
var Update = styled.div`
  grid-area: update;
`
var Delete = styled.div`
  grid-area: delete;
`
var Button = styled.button`
  color: black;
  font-size: 20px;
  margin-left: 60%;
  margin-top: 10%;
  padding: 0;
  border: none;
  background: none;
  &:hover {
    background-color: orange;
  }

`
var Player = ({ play, setGame, turn, ind, setUpdate, setTurn}) => {

  var Test = turn === ind ? True : Wrap;
  if (turn === ind) {

    let msg = new SpeechSynthesisUtterance();
    msg.text = play.name;
    speechSynthesis.speak(msg);
  }

  return (
    <Test onClick={function(event) {
      console.log(event.target);
      if (event.target.id !== 'del') {
        setUpdate(ind);
        setTurn(ind);
      }
      }}>
      <Name>
        <Text>{play.name}</Text>
      </Name>
      <Init>
        <Block>Initiative:</Block>
        <Inp>{play.init}</Inp>
      </Init>
      <Health>
        <Block>Health:</Block>
        <Inp>{play.health}</Inp>
      </Health>
      <Delete id='del'>
        <Button onClick={function() {
          axios({
            method: 'delete',
            url: 'http://localhost:3000/players',
            params: {
            name: play.name
          }
        }).then(() => { setGame() });
        }}> <GrClose /> </Button>
      </Delete>
      {/* <Update>
        <Button> <GrDocumentUpdate /> </Button>
      </Update> */}
    </Test>
  )
}

export default Player;
