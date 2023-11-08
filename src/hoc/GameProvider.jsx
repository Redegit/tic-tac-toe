import { createContext, useEffect, useState } from "react";
import { usePlayer } from "../hook/usePlayer";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const { setPlayer1, setPlayer2, getPlayer1, getPlayer2, getInitialPlayer } = usePlayer();

    const [gameOpened, setGameOpened] = useState(getPlayer1() && getPlayer2());
    const [gameGoing, setGameGoing] = useState(false);
    const [player1, setPlayer1State] = useState(getPlayer1());
    const [player2, setPlayer2State] = useState(getPlayer2());
    const [currentPlayer, setCurrentPlayer] = useState();
    const [turn, setTurn] = useState("x");

    const closeGame = () => {
        setGameOpened(false);
        setGameGoing(false);
    };

    const endGame = () => {
        setGameGoing(false);
    };

    const startGame = () => {
        setCurrentPlayer(getInitialPlayer())
        setGameGoing(true);
        setGameOpened(true);
        setTurn("x");
    };

    const toggleCurrentPlayer = () => {
        setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    };

    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    const getPlayersFromLocal = () => {
        const localPlayer1 = localStorage.player1;
        const localPlayer2 = localStorage.player2;

        setPlayer1State(localPlayer1);
        setPlayer2State(localPlayer2);
    };

    useEffect(() => {
        getPlayersFromLocal();
    }, []);

    const setPlayerNames = (name1, name2) => {
        setPlayer1(name1);
        setPlayer2(name2);
        setPlayer1State(name1);
        setPlayer2State(name2);
    };

    const toggleTurn = () => {
        (turn === 'x') ? setTurn('o') : setTurn('x')
    }

    const gameStep = () => {
        toggleTurn();
        toggleCurrentPlayer();
    }

    return (
        <GameContext.Provider
            value={{
                gameState: {
                    gameOpened,
                    gameGoing,
                    player1,
                    player2,
                    currentPlayer,
                    turn
                },
                setGameState: {
                    setGameOpened,
                    setGameGoing,
                    setPlayer1State,
                    setPlayer2State,
                    setCurrentPlayer,
                    setTurn
                },
                closeGame,
                startGame,
                endGame,
                toggleCurrentPlayer,
                getCurrentPlayer,
                getPlayersFromLocal,
                setPlayerNames,
                gameStep
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
