import { useContext } from "react";
import { GameContext } from "../hoc/GameProvider";

export const useGameContext = () => {
    const context = useContext(GameContext);

    return context;
}