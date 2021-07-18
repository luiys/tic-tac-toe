import React, {useState, useEffect} from 'react';
import tsIcon from './../../assets/typescriptIcon.png'

import './../../styles/global.css'
import './style.css'

const Board: React.FC = () => {

    type Player = "X" | "O"

    const [board, setBoard] = useState<string[]>(["","","","","","","","",""])
    const [player, setPlayer] = useState<Player>("X")
    const [gameStatus, setGameStatus] = useState("Em andamento")

    const handleOnPress = (index:number) => {
        if(gameStatus === "Em andamento"){
            let newBoard = board.slice()
            newBoard[index] = player
            setPlayer(player === "X" ? "O" : "X")
            setBoard(newBoard)
        }
    }

    useEffect(() => {

        const possibleWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        let winX = possibleWins.some(possible => possible.every(index => (board[index] === "X")))
        let winO = possibleWins.some(possible => possible.every(index => (board[index] === "O")))
        winX && setGameStatus("X Venceu")
        winO && setGameStatus("O Venceu")
        !winX && !winO && board.every(square=>square!=="") && setGameStatus("Empate")

    }, [board])

    return (
        <div className="wrapper">
            <header>
                <h1>Tic-Tac-Toe TypeScript</h1>
                <img src={tsIcon} alt="" />
            </header>
            <div className="board">
                {board.map((square, index) => {
                    return <div key={index} className="square" onClick={() => handleOnPress(index)}>{square}</div>
                })}
            </div>
            <div className="result">
                Resultado: {gameStatus}
            </div>
            <div className="restart">
                <button onClick={() => {
                    setBoard(["","","","","","","","",""])
                    setGameStatus("Em andamento")
                }}>RESTART</button>
            </div>
        </div>
        
    );
}

export default Board;