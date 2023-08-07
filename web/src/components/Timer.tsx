import React from "react";
import {GAME_ID, GAME_MAX_DURATION, STATE_COMMIT_1} from "../global/constants";
import useGame from "../hooks/torii/entities/useGame";
import {useDojo} from "../DojoContext";
import {useQuery} from "@tanstack/react-query";

const Timer = () => {

  const {
    network: { provider },
    systemCalls: { reset }
  } = useDojo()

  const gameQuery = useGame(GAME_ID)
  const game = gameQuery.data
  const [remainingTime, setRemainingTime] = React.useState<number>(0)

  const gameStatus = game?.state ?? 0
  const canTimerRun = gameStatus === STATE_COMMIT_1

  const startedTimestamp = game?.startedTimestamp ?? 0
  const endTime = startedTimestamp === 0 ? 0 : startedTimestamp + GAME_MAX_DURATION

  const timeDifferenceQuery = useQuery(
    ['currentTime', startedTimestamp],
      async () => {
        const blockTimestamp = (await provider.provider.getBlock("latest")).timestamp
        return Math.floor(Date.now() / 1000) - blockTimestamp
      },
      {
        enabled: startedTimestamp > 0,
        staleTime: GAME_MAX_DURATION * 1_000,
        initialData: 0
      }
  )

  const offSet = timeDifferenceQuery.data

  React.useEffect(() => {
    if (!endTime) return
    if (!canTimerRun) return
    const interval = setInterval( () => {
      const currentTime = Math.floor(Date.now() / 1000) - offSet
      const timeDifference = endTime - currentTime
      console.log({timeDifference, endTime, currentTime})

      if (timeDifference > 0) {
        setRemainingTime(timeDifference)
      } else {
        setRemainingTime(0)
        clearInterval(interval)

        reset(GAME_ID)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [reset, endTime, canTimerRun, offSet])

  return (
    <p className={'text-option-2 text-[18px] font-noto'}>Time's up in {canTimerRun ? remainingTime : 0}...</p>
  )
}

export default Timer