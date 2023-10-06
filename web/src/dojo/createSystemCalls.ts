import { SetupNetworkResult } from "./setupNetwork";
import {PAPER, ROCK, SCISSORS} from "../global/constants";
import {Account} from "starknet";


export function createSystemCalls(
    { execute }: SetupNetworkResult,
) {
    const create = async (signer: Account) => {
        return await execute(signer, "create", []);
    };

    const commit = async (signer: Account, gameId: number, hashedCommit: bigint) => {
        return await execute(signer, "commit", [gameId, hashedCommit]);
    };

    const reveal = async (
      signer: Account,
      gameId: number,
      hashedCommit: bigint,
      commit: typeof ROCK | typeof PAPER | typeof SCISSORS,
      salt: number
    ) => {
        return await execute(signer, "reveal", [gameId, hashedCommit, commit, salt]);
    };

    const reset = async (signer: Account, gameId: number) => {
        return await execute(signer, "reset", [gameId]);
    };

    return {
        create, commit, reveal, reset
    };
}