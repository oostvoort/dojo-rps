import React from "react";
import {useDojo} from "../DojoContext";
import {commits, GAME_ID, STATE_DECIDED} from "../global/constants";
import {useComponentValue} from "@dojoengine/react";
import {getEntityIdFromKeys} from "@dojoengine/utils";

const useLogs = () => {
    const [battleLogs, setBattleLogs] = React.useState<Array<{selectedChoice: string, player: string}>>([]);
    const [totalGames, setTotalGames] = React.useState<number>(0)

    const {
        setup: {
            systemCalls: { reset },
            components: { Game }
        },
        account: { account }
    } = useDojo()

    const game = useComponentValue(Game, getEntityIdFromKeys([BigInt(GAME_ID)]))
    const gameWinner = game?.winner ?? 0
    const gameStatus = game?.state ?? 0
    const winningChoice = (gameWinner === 1 ? game?.player1_commit : game?.player2_commit) ?? 0
    const selectedChoice = commits[winningChoice]

    // only player1 resets
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isPlayer1 = account.address === game?.player1

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
    }, [account, reset, selectedChoice, gameStatus, gameWinner, isPlayer1])

    return {
        battleLogs,
        totalGames,
    }
}

export default useLogs