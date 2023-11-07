import { useState } from "react";
import "./player_selector.scss"
import { useGameContext } from "../../../hook/useGameContext";

export const PlayerSelector = ({ startGame }) => {
    const [playerSelectData, setPlayerSelectData] = useState({ player1: "", player2: "" })
    const [assertion, setAssertion] = useState();
    const { setPlayerNames } = useGameContext();

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value.toUpperCase();
        setPlayerSelectData({ ...playerSelectData, [name]: value })
    }

    const setPlayers = () => {
        if (playerSelectData.player1) {
            if (playerSelectData.player2) {
                if (playerSelectData.player1 !== playerSelectData.player2) {
                    setPlayerNames(playerSelectData.player1, playerSelectData.player2)
                    startGame()
                } else {
                    setAssertion("Имена не должны совпадать")
                    return
                }
            } else {
                setAssertion("Не введено имя игрока 2")
                return
            }
        } else {
            setAssertion("Не введено имя игрока 1")
            return
        }
    }

    return (
        <div id="player-names" className={"player-names"}>
            <label htmlFor="player1" className={"player-label"}>Имя первого игрока:</label>
            <input onChange={handleInputChange} type="text" name="player1" className={"player-input"} required />
            <label htmlFor="player2" className={"player-label"}>Имя второго игрока:</label>
            <input onChange={handleInputChange} type="text" name="player2" className={"player-input"} required />
            {assertion &&
                <div className="assertion">{assertion}</div>
            }
            <button id="start-button" onClick={setPlayers} className={"btn"}>Начать игру</button>
        </div>
    );
}
