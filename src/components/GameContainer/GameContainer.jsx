import { useEffect, useState } from "react";
import { GameField } from "./GameField/GameField";
import { PlayerSelector } from "./PlayerSelector/PlayerSelector";
import "./game_container.scss"
import { usePlayer } from "../../hook/usePlayer";
import { useGameContext } from "../../hook/useGameContext";
import { GameStat } from "./GameStat/GameStat";

export const GameContainer = () => {
    const { getPlayer1, getPlayer2 } = usePlayer();
    const { gameState, closeGame, startGame } = useGameContext();
    const [gameStatus, setGameStatus] = useState();
    const [reRenderToggler, setReRenderToggler] = useState(false);

    useEffect(() => {
        if (!(getPlayer1() && getPlayer2())) {
            closeGame();
        } else {
            startGame();
        }

    }, []);

    const restartGame = () => {
        setReRenderToggler(!reRenderToggler);
        startGame();
        updateStatus();
    }

    const updateStatus = () => {
        setGameStatus("Ходит " + gameState.currentPlayer)
    }

    useEffect(() => {
        if (gameState.gameGoing) updateStatus();
    }, [gameState.currentPlayer]);

    return (
        <main className={"container"}>
            {gameState.gameOpened
                ? <>
                    <div id="status" className={"status"}>{gameStatus}</div>
                    <GameField restartGame={restartGame} setGameStatus={setGameStatus} reRenderToggler={reRenderToggler} />
                    <button onClick={restartGame} id="btn-restart" className={"btn"}>Заново</button>
                </>
                : <PlayerSelector startGame={startGame} />}
        </main>
    );
}
