import { Page } from "./components/Page";
import { GameProvider } from "./hoc/GameProvider";

function App() {
  return (
    <GameProvider >
      <Page />
    </GameProvider>
  );
}

export default App;
