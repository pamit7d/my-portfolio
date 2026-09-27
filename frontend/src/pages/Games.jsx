import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TicTacToe from '../components/TicTacToe';
import '../styles/games.css';
const LampScene = lazy(() => import('./Lamp'));

const gamesList = [
    {
        id: 'ticTacToe',
        title: 'Tic Tac Toe',
        description: 'Classic 3x3 grid. Play against a friend.',
    },
    {
        id: 'bulb',
        title: 'Bulb (Lamp Scene)',
        description: 'Interactive lamp scene — a small physics toy.',
    },
    // future games can be added here
];

const Games = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { gameId } = useParams();
    const params = new URLSearchParams(location.search);
    const selectedFromRoute = gameId || params.get('game');
    const [selected, setSelected] = useState(selectedFromRoute || null);

    useEffect(() => {
        const nextGame = selectedFromRoute || null;
        setSelected(nextGame);
    }, [selectedFromRoute]);

    const setGame = (gameId) => {
        if (gameId) {
            navigate(`/games/${gameId}`, { replace: true });
        } else {
            navigate('/games', { replace: true });
        }
        setSelected(gameId);
    };

    const renderSelected = () => {
        if (selected === 'ticTacToe') return <TicTacToe />;
        if (selected === 'bulb') {
            return (
                <div className="games-overlay">
                    <div className="games-overlay-close">
                        <button className="lamp-close" aria-label="Close lamp view" onClick={() => setGame(null)}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M15 6 L9 12 L15 18" />
                            </svg>
                        </button>
                    </div>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Suspense fallback={<div style={{ color: '#9aa0a6', paddingTop: 40, textAlign: 'center' }}>Loading lamp...</div>}>
                            <LampScene />
                        </Suspense>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="games-page">
            <div className="games-hero">
                <h1>Games</h1>
                <p className="games-intro">A small collection of games — more will be added.</p>
            </div>

            <div className="games-deco">
                <div className="glow"></div>
                <div className="glow2"></div>
            </div>

            {!selected ? (
                <section className="games-grid">
                    {gamesList.map((g) => (
                        <article key={g.id} onClick={() => setGame(g.id)} className="game-card project-card" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') setGame(g.id); }}>
                            <div className="project-header">
                                <div className="project-title game-title">{g.title}</div>
                            </div>
                            <div className="project-description game-desc">{g.description}</div>
                        </article>
                    ))}
                </section>
            ) : (
                <section style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: 680, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h2 style={{ margin: 0 }}>{gamesList.find(g => g.id === selected)?.title}</h2>
                        <button onClick={() => setGame(null)} style={{ padding: '8px 12px', borderRadius: 6, background: '#f0d2a8', border: 'none', color: '#050505' }}>Back</button>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>{renderSelected()}</div>
                </section>
            )}
        </div>
    );
};

export default Games;
