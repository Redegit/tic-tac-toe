export const usePlayer = () => {
    const setPlayer1 = (playerName) => {
        localStorage.player1 = playerName
    }

    const setPlayer2 = (playerName) => {
        localStorage.player2 = playerName
    }

    const getPlayer1 = () => {
        return localStorage.player1
    }

    const getPlayer2 = () => {
        return localStorage.player2
    }

    const setPrevPlayer = (player) => {
        localStorage.prevPlayer = player;
    }

    const getPrevPlayer = () => {
        return localStorage.prevPlayer;
    }

    const getInitialPlayer = () => {
        const p1 = getPlayer1()
        const p2 = getPlayer2()
        const prev = getPrevPlayer();
        if (prev) {
            if (prev === p1) {
                setPrevPlayer(p2);
                return p2
            } else {
                setPrevPlayer(p1);
                return p1
            }
        } else {
            setPrevPlayer(p1);
            return p1
        }
    }

    const resetPlayers = () => {
        delete localStorage.player1;
        delete localStorage.player2;
        delete localStorage.prevPlayer;
    }


    return {
        setPlayer1,
        setPlayer2,
        getPlayer1,
        getPlayer2,
        resetPlayers,
        setPrevPlayer,
        getPrevPlayer,
        getInitialPlayer
    };
}
