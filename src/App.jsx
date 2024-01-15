import { useState } from "react";
import GameBoard from "./components/Gameboard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";


function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  };
  return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = derivedActivePlayer(gameTurns);

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer((currPlayer) => currPlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      let currPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currPlayer }, ...prevTurns];
      return updatedTurns;
    })
    
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />

        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>

  )
}

export default App
