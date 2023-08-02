import {GAME_ID, STATE_COMMIT_1, STATE_COMMIT_2, STATE_REVEAL_1} from "../global/constants";
import useGame from "./torii/entities/useGame";

const useGameStatus = () => {

  const gameQuery = useGame(GAME_ID)
  if (!gameQuery.data) {
    if (gameQuery.isSuccess) return `Game ${GAME_ID} not found`
    else return 'Fetching game'
  }

  const game = gameQuery.data
  const gameStatus = game.state

  if (gameStatus < STATE_COMMIT_1) return 'Idle, Waiting for your commit'
  else if (gameStatus === STATE_COMMIT_1) {
    const player1Hash = game.player1.hash

    if (player1Hash) return 'Playing, Waiting for Player2'
    else return 'Playing, Waiting for Player1'
  } else if (gameStatus === STATE_COMMIT_2) return 'Playing, Waiting for reveal'
    else if (gameStatus === STATE_REVEAL_1) {
    const player1Commit = game.player1.commit

    if (player1Commit) return 'Playing, Waiting for Player2 Reveal'
    else return 'Playing, Waiting for Player1 Reveal'
  }
    else return 'Done, Waiting for reset'
}

export default useGameStatus