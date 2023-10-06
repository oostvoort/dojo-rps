import {GAME_ID, STATE_COMMIT_1, STATE_COMMIT_2, STATE_REVEAL_1} from "../global/constants";
import {useComponentValue} from "@dojoengine/react";
import {useDojo} from "../DojoContext";
import {getEntityIdFromKeys} from "@dojoengine/utils";

const useGameStatus = () => {
  const {
    setup: {
      components: { Game }
    }
  } = useDojo()
  const entityId = getEntityIdFromKeys([BigInt(GAME_ID)])

  const game = useComponentValue(Game, entityId)

  if (!game) return `Game ${GAME_ID} not found`

  const gameStatus = game.state

  if (gameStatus < STATE_COMMIT_1) return 'Idle, Waiting for your commit'
  else if (gameStatus === STATE_COMMIT_1) {
    const player1Hash = game.player1_hash

    if (player1Hash) return 'Playing, Waiting for Player2'
    else return 'Playing, Waiting for Player1'
  } else if (gameStatus === STATE_COMMIT_2) return 'Playing, Waiting for reveal'
    else if (gameStatus === STATE_REVEAL_1) {
    const player1Commit = game.player1_commit

    if (player1Commit) return 'Playing, Waiting for Player2 Reveal'
    else return 'Playing, Waiting for Player1 Reveal'
  }
    else return 'Done, Waiting for reset'
}

export default useGameStatus