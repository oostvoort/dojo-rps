import {gql} from "graphql-request";
import useTorii from "../useTorii";

const QUERY = gql`
  query GameEntity($key: String!) {
    entities(keys: [$key], componentName: "Player") {
      id
      components {
        __typename
        ... on Player {
          wins
        }
      }
    }
  }
`

type GqlReturnType = {
  entities: {
    id: string,
    components: {
      "__typename": "Player",
      wins: number
    }[]
  }[]
}

const parseReturn = (data: GqlReturnType) => {
  const entity = data.entities[0]
  if (!entity) return { wins: 0, id: "defaultId" }

  const values = entity.components[0]
  if (!values) return { wins: 0, id: "defaultId" }

  return {
    wins: values.wins,
    id: entity.id
  }
}

const usePlayer = (address: string) => {
  const player = useTorii<GqlReturnType>(
    ['player', address],
    QUERY,
    { key: address },
    {
      refetchInterval: 1_000,
      enabled: !!address
    }
  )
  if (player.data) {
    return {
      ...player,
      data: parseReturn(player.data)
    }
  } else return player
}

export default usePlayer