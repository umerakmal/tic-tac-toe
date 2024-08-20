import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

export default function Game() {
    const { mode } = useParams();
    const [player, setPlayer] = useState('X');
    const [board, setBoard] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (mode === 'single-game' && player === 'O' && !winner && !draw) {
            const aiMove = makeAiMove(board);
            setTimeout(() => {
                handleClick(aiMove);
            }, 500);
        }
    }, [player, board, winner, draw, mode]);

    const handleClick = (index) => {
        if (board[index] || winner || draw) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else if (newBoard.every(cell => cell !== null)) {
            setDraw(true);
        } else {
            setPlayer(player === 'X' ? 'O' : 'X');
        }
    };

    const makeAiMove = (board) => {
        // Winning combinations
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Check if AI can win
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] === 'O' && board[b] === 'O' && board[c] === null) {
                return c;
            }
            if (board[a] === 'O' && board[b] === null && board[c] === 'O') {
                return b;
            }
            if (board[a] === null && board[b] === 'O' && board[c] === 'O') {
                return a;
            }
        }

        // Block the player from winning
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] === 'X' && board[b] === 'X' && board[c] === null) {
                return c;
            }
            if (board[a] === 'X' && board[b] === null && board[c] === 'X') {
                return b;
            }
            if (board[a] === null && board[b] === 'X' && board[c] === 'X') {
                return a;
            }
        }

        // If no win/block, take the center if available
        if (board[4] === null) {
            return 4;
        }

        // Otherwise, take a random corner
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(index => board[index] === null);
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // If no corners available, take a random available move
        const availableMoves = board
            .map((val, index) => (val === null ? index : null))
            .filter(val => val !== null);

        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    };


    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setDraw(false);
        setPlayer('X');
    };

    return (
        <>
            <div className="game">
                <h2 className="text-center mt-5 text-danger">Tic Tac Toe</h2>
                <ScoreBoard player={player} winner={winner} draw={draw} resetGame={resetGame} />
                <GameBoard board={board} handleClick={handleClick} />
            </div>
            <button type="button" className="home-btn btn btn-info" onClick={() => {
                navigate('/')
            }}>Back To Main Menu</button>
        </>
    );
}
