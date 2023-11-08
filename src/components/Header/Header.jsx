import { useGameContext } from "../../hook/useGameContext";
import { usePlayer } from "../../hook/usePlayer";
import "./header.scss"

export const Header = () => {
    const { resetPlayers } = usePlayer();
    const { closeGame } = useGameContext();

    const changePlayers = () => {
        resetPlayers();
        closeGame();
    }

    return (
        <header>
            <div className={"title"}>{"Крестики-нолики"}</div>
            <div onClick={changePlayers} className="btn"><span>🫥</span></div>
        </header>
    );
}
