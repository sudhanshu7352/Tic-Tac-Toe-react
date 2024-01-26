import { useState } from "react";
import GameBoard from "./components/Gameboard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  };
  return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({ 'X': 'Player 1', 'O': 'Player 2' });
  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialGameboard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  for (let combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleRestart = () => {
    setGameTurns([])
  }

  const handlePlayersNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  const handleSelectSquare = (rowIndex, colIndex) => {
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
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayersNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayersNameChange}/>

        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>

  )
}

export default App
