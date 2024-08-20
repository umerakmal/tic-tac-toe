import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const handleCLick = (mode) => {
        navigate(`/game/${mode}-game`);
    }
    return (
        <>
            <h1 className='text-center mt-5 text-danger'>Welcome to Tic-Tac-Toe Game</h1>
            <div className='home'>
                <div className="home-buttons d-flex justify-content-center align-items-center flex-column gap-3">
                    <button className='btn btn-primary px-5 py-3' onClick={() => handleCLick('single')}>Single Player</button>
                    <button className='btn btn-danger px-5 py-3' onClick={() => handleCLick('multi')}>Multi Player</button>
                </div>
            </div>
        </>
    )
}
