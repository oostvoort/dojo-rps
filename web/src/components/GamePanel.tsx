import React, {useState} from "react";
import clsx from "clsx";
import Choice from "./Choice.tsx";
import useSaltGenerator from "../hooks/useSaltGenerator";
import {useDojo} from "../DojoContext";
import {commits, GAME_ID} from "../global/constants";
import {poseidonHashMany} from "micro-starknet";
import {useComponentValue} from "@dojoengine/react";
import {Utils} from "@dojoengine/core";
import useLogs from "../hooks/useLogs.tsx";
import useGameStatus from "../hooks/useGameStatus";

// const gameId = 0

export default function GamePanel() {
    const [selectedChoice, setSelectedChoice] = React.useState<string | null>(null)
    const [remainingTime, setRemainingTime] = useState<number>(0)
    const {
        battleLogs,
        totalGames,
    } = useLogs()

    const {
        systemCalls: { commit },
        components: { Game, Player },
        network: { signer }
    } = useDojo()

    const { salt, changeSalt } = useSaltGenerator()

    const handleSelectedChoice = (choice: string) => {
        if (selectedChoice) return
        changeSalt()
        const index = commits.findIndex(commit => choice === commit)
        const hashedCommit = poseidonHashMany([BigInt(index), BigInt(salt)])
        commit(GAME_ID, hashedCommit).then((res) => {
            console.log("COMMIT RESPONSE: ", res)
        })
        setSelectedChoice(choice)
    }

    const game = useComponentValue(Game, Utils.getEntityIdFromKeys([BigInt(GAME_ID)]))

    const isUserPlayer1 = BigInt(game?.player1 ?? 0) === BigInt(signer.address)

    const player1Choice = game?.player1_commit ?? 0
    const player2Choice = game?.player2_commit ?? 0

    const opponentChoice = isUserPlayer1 ? player2Choice : player1Choice

    const statusText = useGameStatus()
    const player1 = useComponentValue(Player, Utils.getEntityIdFromKeys([BigInt(game?.player1 ?? 0)]))
    const player2 = useComponentValue(Player, Utils.getEntityIdFromKeys([BigInt(game?.player2 ?? 0)]))

    console.log('game: ', game)
    console.log('player 1: ', player1)
    console.log('player 2: ', player2)
    console.log("signer: ", signer)
    console.log("salt: ", salt)

    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000)
            const timeDifference = (game?.started_timestamp ? game?.started_timestamp + 20000 : 1689665128) - currentTime

            if (timeDifference > 0) {
                setRemainingTime(timeDifference)
            } else {
                setRemainingTime(0)
                clearInterval(interval)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }


    }, [game?.started_timestamp])

    return (
        <React.Fragment>
            <div className={'flex flex-col w-9/12 gap-2'}>
                <div className={clsx(
                    'flex w-full p-6',
                    'rounded-3xl border-2 border-option-5',
                    'bg-option-6'
                )}>
                    <p className={'text-[36px] text-option-2 font-oswald'}>
                        {/* put in status here based on game.status */}
                        Status : <span className={'text-[28px] text-option-1 font-noto'}>{statusText}</span>
                    </p>
                </div>
                <div className={'flex flex-col items-center w-full h-full gap-5'}>
                    <div className={'mt-8'}>
                        <p className={'text-option-2 text-[20px] font-noto text-center mb-4'}>Opponent Choice</p>
                        {opponentChoice === 0 && <Choice image={'icon_questionMark.png'} />}
                        {opponentChoice !== 0 && <Choice
                          image={`icon_${commits[opponentChoice].toLowerCase()}.png`}
                          handSign={commits[opponentChoice]}
                        />}
                    </div>
                    <div>
                        <div className={'mb-4 text-center'}>
                            <p className={'text-option-1 text-[28px] font-noto'}>Choose your hand</p>
                            <p className={'text-option-2 text-[18px] font-noto'}>Times up in {remainingTime}...</p>
                            {/*<p className={'text-option-2 text-[36px] font-oswald'}>YOU WIN!</p>*/}
                        </div>
                        <div className={'flex gap-20'}>
                            <Choice
                                image={'icon_rock.png'}
                                handSign={'Rock'}
                                isSelected={selectedChoice === 'Rock'}
                                onSelect={handleSelectedChoice}
                            />
                            <Choice
                                image={'icon_paper.png'}
                                handSign={'Paper'}
                                isSelected={selectedChoice === 'Paper'}
                                onSelect={handleSelectedChoice}
                            />
                            <Choice
                                image={'icon_scissors.png'}
                                handSign={'Scissors'}
                                isSelected={selectedChoice === 'Scissors'}
                                onSelect={handleSelectedChoice}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col gap-6 w-3/12'}>
                <div className={'p-8 rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
                    <p className={'text-[36px] text-option-2 font-oswald mb-2'}>Stats</p>\
                    {/* TODO: keep track of total games played in use state*/}
                    <p className={'text-[18px] text-option-1 font-noto mb-1'}>Total Games: {totalGames}</p>
                    <p className={'text-[20px] text-option-2 font-bold'}>
                        {/* TODO: hook up player1 wins*/}
                        Player1 : <span className={'text-option-1 ml-1'}>{player1?.wins ?? 0} Wins</span>
                    </p>
                    <p className={'text-[20px] text-option-2 font-bold'}>
                        {/* TODO: hook up player2 wins*/}
                        Player2 : <span className={'text-option-1 ml-1'}>{player2?.wins ?? 0} Wins</span>
                    </p>
                </div>
                <div className={'p-8 h-full rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
                    <p className={'text-[36px] text-option-2 font-oswald mb-2'}>History</p>
                    {/* TODO: store wins in useState */}
                    {
                        battleLogs.length > 0 && battleLogs.map((data, index) => {
                            return (
                                <p key={index} className={'text-[18px] text-option-1 font-noto'}>Player {data.player} won with {data.selectedChoice} </p>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
