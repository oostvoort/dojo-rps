import React from "react";
import {useDojo} from "../DojoContext";
import {commits, GAME_ID, STATE_DECIDED} from "../global/constants";
import useGame from "./torii/entities/useGame";

const useLogs = () => {
    const [battleLogs, setBattleLogs] = React.useState<Array<{selectedChoice: string, player: string}>>([]);
    const [totalGames, setTotalGames] = React.useState<number>(0)

    const {
        setup: {
            systemCalls: { reset },
        },
        account: { account }
    } = useDojo()

    const gameQuery = useGame(GAME_ID)
    const game = gameQuery.data

    const gameWinner = game?.winner ?? 0
    const gameStatus = game?.state ?? 0
    const winningChoice = (gameWinner === 1 ? game?.player1.commit : game?.player2.commit) ?? 0
    const selectedChoice = commits[winningChoice]

    // only player1 resets
    const isPlayer1 = account.address === game?.player1.address

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
        if (!isPlayer1) return
        const resetGame = setTimeout(() => {
            reset(account, GAME_ID).then()
        }, 5_000)

        return () => clearTimeout(resetGame)
    }, [reset, selectedChoice, gameStatus, gameWinner, isPlayer1])

    return {
        battleLogs,
        totalGames,
    }
}

export default useLogs