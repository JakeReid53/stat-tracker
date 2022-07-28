import React, { useState }from 'react';
import styled from 'styled-components';
import axios from 'axios';

var Change = styled.button`
  &:hover {
    background-color: orange;
  }
`

var Con = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 40%;
  grid-template-areas:
  'game player';
`

var Cha = styled.div`
  grid-area: game;
  display: flex;
  justify-content: center;
  align-items: center;
`

var Ad = styled.div`
  grid-area: player;
  display: flex;
  justify-content: center;
  align-items: center;
`
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
var Buttons = ({setGame, next, gameName}) => {
  var [id, setId] = useState(false);
  return(
    <Con>
      <Cha>
        <Change onClick={function() { next(); }} >End turn</Change>
      </Cha>
      <Ad>
        <Change onClick={function(event) { Modal.defaultProps.show = show; setId(!id)}}>Add/Update Player</Change>
      </Ad>
      <Modal id='modal' onClick={function(event) {if(event.target.id === 'modal') { Modal.defaultProps.show = hide; setId(!id);}}}>
        <ModalContent>
          <form onSubmit={
            function(event) {
              axios({
                method: 'post',
                url: 'http://localhost:3000/players',
                data: {
                  name: event.target[0].value,
                  init: event.target[1].value,
                  health: event.target[2].value,
                  game: gameName
                }
              })
            }
          }>
            <label>Name:</label>
            <Inpu type="text" required></Inpu>
            <label>Initiative:</label>
            <Inpu type="number" required></Inpu>
            <label>Health:</label>
            <Inpu type="number" required></Inpu>
            <Inpu type="submit"></Inpu>
          </form>
        </ModalContent>
      </Modal>
    </Con>
  );
}

export default Buttons;