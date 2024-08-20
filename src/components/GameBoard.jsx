import React from 'react';
// import Cell from './Cell';
import Square from './Square';
// import './Board.css';

export default function GameBoard({ board, handleClick }) {
    return (
        <div className="board">
            {board.map((value, index) => (
                <Square key={index} value={value} onClick={() => handleClick(index)} />
            ))}
        </div>
    );
}
