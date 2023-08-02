import React from "react";
import {GAME_ID, GAME_MAX_DURATION} from "../global/constants";
import useGame from "../hooks/torii/entities/useGame";

const Timer = () => {

  const gameQuery = useGame(GAME_ID)
  const game = gameQuery.data
  const [remainingTime, setRemainingTime] = React.useState<number>(0)

  const startedTimestamp = game?.startedTimestamp ?? 0

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000)
      const timeDifference = startedTimestamp + GAME_MAX_DURATION - currentTime

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
  }, [startedTimestamp])

  return (
    <p className={'text-option-2 text-[18px] font-noto'}>Time's up in {remainingTime}...</p>
  )
}

export default Timer