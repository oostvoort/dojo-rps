import { SetupNetworkResult } from "./setupNetwork";



export function createSystemCalls(
    { execute, syncWorker }: SetupNetworkResult,
) {
    const create = async () => {
        const tx = await execute("create", []);
        syncWorker.sync(tx.transaction_hash);
    };

    const commit = async () => {
        const tx = await execute("commit", []);
        syncWorker.sync(tx.transaction_hash);
    };

    const reveal = async () => {
        const tx = await execute("reveal", []);
        syncWorker.sync(tx.transaction_hash);
    };

    const reset = async () => {
        const tx = await execute("reset", []);
        syncWorker.sync(tx.transaction_hash);
    };

    return {
        create, commit, reveal, reset
    };
}