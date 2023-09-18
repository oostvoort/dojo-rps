import {gql} from "graphql-request";
import useTorii from "../useTorii";

const QUERY = gql`
query GameEntity($key: String!) {
  entities(keys: [$key]) {
    edges {
      node {
        id
        components {
          __typename
          ... on Game {
            player1
            player1_commit
            player1_hash
            player2
            player2_commit
            player2_hash
            started_timestamp
            state
            winner
          }
        }
      }
    }
  }
}
`

type GqlReturnType = {
  entities: {
    edges: {
      node: {
        id: string,
        components: {
          "__typename": "Game",
          player1: string,
          player1_commit: number,
          player1_hash: string,
          player2: string,
          player2_commit: number,
          player2_hash: string,
          started_timestamp: number,
          state: number,
          winner: number
        }[]
      }
    }[]
  }
}

const parseReturn = (data: GqlReturnType) => {
  const entity = data.entities.edges?.[0]?.node
  if (!entity) return undefined

  const values = entity.components[0]
  if (!values) return  undefined

  return {
    id: entity.id,
    player1: {
      address: values.player1,
      commit: values.player1_commit,
      hash: values.player1_hash
    },
    player2: {
      address: values.player2,
      commit: values.player2_commit,
      hash: values.player2_hash
    },
    startedTimestamp: values.started_timestamp,
    state: values.state,
    winner: values.winner
  }
}

const useGame = (gameId: number) => {
  const key = `0x${gameId.toString(16)}`
  const game = useTorii<GqlReturnType>(
    ['game', gameId],
    QUERY,
    { key },
    {
      refetchInterval: 1_000
    })
  if (game.data) {
    return {
      ...game,
      data: parseReturn(game.data)
    }
  } else return game
}

export default useGame