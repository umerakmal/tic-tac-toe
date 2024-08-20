import React from 'react';

export default function ScoreBoard({ player, winner, draw, resetGame }) {
    return (
        <div className="scoreboard d-flex flex-column justifiy-content-center align-items-center">
            {winner ? (
                <h3 className="text-center">Winner: {winner}</h3>
            ) : draw ? (
                <h3 className="text-center">Draw!</h3>
            ) : (
                <h3 className="text-center">Current Player: {player}</h3>
            )}
            <button className="btn btn-warning mt-3" onClick={resetGame}>
                Reset Game
            </button>
        </div>
    );
}
