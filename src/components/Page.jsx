import { useGameContext } from "../hook/useGameContext";
import { Footer } from "./Footer/Footer";
import { GameContainer } from "./GameContainer/GameContainer";
import { Header } from "./Header/Header";

export const Page = () => {
    const { gameState } = useGameContext();

    return (
        <div id="page" data-game-end={!gameState.gameGoing}>
            <Header />
            <GameContainer />
            <Footer />
        </div>
    );
}
