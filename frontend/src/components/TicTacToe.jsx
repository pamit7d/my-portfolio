import React, { useState } from 'react';

const Square = ({ value, onClick }) => (
    <button className="ttt-square" onClick={onClick} style={{
        width: 80,
        height: 80,
        fontSize: 32,
        margin: 6,
        background: '#0b0b0b',
        color: '#00f2ff',
        border: '1px solid #222',
        borderRadius: 8,
    }}>{value}</button>
);

const TicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(squares);

    const handleClick = (i) => {
        if (winner || squares[i]) return;
        const next = squares.slice();
        next[i] = xIsNext ? 'X' : 'O';
        setSquares(next);
        setXIsNext(!xIsNext);
    };

    const reset = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>
                <strong style={{ color: '#9aa0a6' }}>{winner ? `Winner: ${winner}` : `Next: ${xIsNext ? 'X' : 'O'}`}</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', justifyContent: 'center' }}>
                {squares.map((s, i) => (
                    <Square key={i} value={s} onClick={() => handleClick(i)} />
                ))}
            </div>

            <div style={{ marginTop: 16 }}>
                <button onClick={reset} style={{ padding: '8px 12px', borderRadius: 6, background: '#00f2ff', border: 'none', color: '#050505' }}>Reset</button>
            </div>
        </div>
    );
};

function calculateWinner(sq) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    return null;
}

export default TicTacToe;
