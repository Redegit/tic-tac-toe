import { useGameContext } from "../../../hook/useGameContext";

export const GameStat = () => {
    const { gameState } = useGameContext();

    return (
        <div className="game-stat">
            <div className="player">{gameState.player1}</div>
            <div className="player">{gameState.player2}</div>
        </div>
    );
}
