import { useQuery } from '@tanstack/react-query'
import { useDojo } from '../../../DojoContext'
import { BLOCK_TIME } from '../../../global/constants'
import { getEntityIdFromKeys } from '@dojoengine/utils'
import { Component, getComponentValue, setComponent } from '@latticexyz/recs'
import _ from 'lodash'

const useEntities = () => {

  const {
    setup: {
      components: { Game, Player },
      network: { graphSdk }
    }
  } = useDojo()

  const componentTypes: Component[] = [Game, Player]

  return useQuery(
    ['entities'],
    async () => {
      const { data } = await graphSdk.getEntities()
      if (!data || !data?.entities?.edges || ! data?.entities?.edges) return { entities: { edges: [] } }
      for (const edge of data.entities.edges) {
        if (!edge?.node?.components) continue
        const keys = edge.node.keys
        if (!keys) continue
        const entityId = getEntityIdFromKeys(keys.map(key => BigInt(key ?? '0x0')))
        if (!edge?.node?.components) continue
        // eslint-disable-next-line no-unsafe-optional-chaining
        for (const component of edge?.node?.components) {
          if (!component) continue
          const componentType = componentTypes.find(componentType => componentType.metadata?.name === component?.__typename)
          if (!componentType) continue
          const currentValue = getComponentValue(componentType, entityId)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete component["__typename"]

          // do not update if it's already equal
          if (_.isEqual(component, currentValue)) continue

          setComponent(componentType, entityId, component)
        }
      }
      return data

    },
    {
      refetchInterval: BLOCK_TIME
    })
}

export default useEntities
