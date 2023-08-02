import React from "react";
import {useDojo} from "../DojoContext";
import {commits, GAME_ID, STATE_DECIDED} from "../global/constants";
import useGame from "./torii/entities/useGame";

const useLogs = () => {
    const [battleLogs, setBattleLogs] = React.useState<Array<{selectedChoice: string, player: string}>>([]);
    const [totalGames, setTotalGames] = React.useState<number>(0)

    const {
        systemCalls: { reset }
    } = useDojo()

    const gameQuery = useGame(GAME_ID)
    const game = gameQuery.data

    const gameWinner = game?.winner ?? 0
    const gameStatus = game?.state ?? 0
    const winningChoice = (gameWinner === 1 ? game?.player1.commit : game?.player2.commit) ?? 0
    const selectedChoice = commits[winningChoice]

    React.useEffect(() => {
        if (gameStatus !== STATE_DECIDED) return
        setTotalGames(prevTotalGames => prevTotalGames + 1)
        setBattleLogs(prevBattleLogs => {
            return [
              ...prevBattleLogs,
                {
                    player: gameWinner.toString(),
                    selectedChoice
                }
            ]
        })
        setTimeout(() => {
            reset(GAME_ID).then()
        }, 5_000)
    }, [reset, selectedChoice, gameStatus, gameWinner])

    return {
        battleLogs,
        totalGames,
    }
}

export default useLogs