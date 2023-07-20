import useLocalStorage from "./useLocalStorage";
import {useQuery} from "@tanstack/react-query";
import {useDojo} from "../DojoContext";
import {WORLD_ADDRESS} from "../dojo/setupNetwork";

const useSyncEvents = () => {
  const {
    network: { provider, syncWorker }
  } = useDojo()

  const [lastBlock, setLastBlock] = useLocalStorage('RPS_LAST_SYNCED_BLOCK', 0)

  return useQuery({
    queryKey: ['syncBlock'],
    queryFn: async () => {
      const latestBlock = await provider.provider.getBlock("latest")
      if (latestBlock.block_number === lastBlock) return lastBlock

      const { events } = await provider.provider.getEvents({
        address: WORLD_ADDRESS,
        from_block: { block_number: lastBlock },
        to_block: { block_number: latestBlock.block_number  },
        chunk_size: 400
      })

      const txHashes = events.map(event => event.transaction_hash)
      const uniqueTxHashes = txHashes.filter((txHash, index) => txHashes.indexOf(txHash) === index)
      const syncPromises = uniqueTxHashes.map(txHash => syncWorker.sync(txHash))
      await Promise.all(syncPromises)
      setLastBlock(latestBlock.block_number)
      return latestBlock.block_number
    },
    refetchInterval: 2_500
  })
}

export default useSyncEvents