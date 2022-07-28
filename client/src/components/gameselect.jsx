import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


var Wrapper = styled.div`
  background-color: #40171d;
  height: 100vh;
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
  let Modal = styled.div`
  display: ${props => props.show.display};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  color: black;
  text-align: left;
`;
let ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;
var Inpu = styled.input`
  display: block;
`
Modal.defaultProps = {
  show: {
    display: 'none'
  }
}
const show = {
  display: 'block'
};
const hide = {
  display: 'none'
};
const Select = ({game, setGameName}) => {
  return (
    <div>
      <button onClick={function(event) {
        setGameName(event.target.innerText);
      }}>{game.name}</button>
      <span></span>
    </div>
  )
}

const NewGame = (name, disc, setGameName) => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/games',
    data: {
      name: name,
      disc: disc,
      turn: 0
    }
  }).then(() => {
    setGameName(name);
  });

}

const GameSelect = ({setGameName}) => {
  const [games, setGames] = useState([]);
  const [id, setId] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/all'
    })
    .then((resu) => { setGames(resu.data) });
  }, []);
  return (
    <Wrapper>
      <Title>What Game Are You Playing?</Title>
      <div>
        {games.map((game => (
          <Select game={game} setGameName={setGameName}/>
        )))}
      </div>
      <button onClick={function(event) { Modal.defaultProps.show = show; setId(!id)}}>New Game</button>
      <Modal id='modal' onClick={function(event) {if(event.target.id === 'modal') { Modal.defaultProps.show = hide; setId(!id);}}}>
        <ModalContent>
          <form onSubmit={
            function(event) {
              NewGame(event.target[0].value, event.target[1].value, setGameName)
            }
          }>
            <label>Name:</label>
            <Inpu type="text" required></Inpu>
            <label>Description:</label>
            <textarea cols="100" rows="10" maxlength='200' required></textarea>
            <Inpu type="submit"></Inpu>
          </form>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}

export default GameSelect;