import './App.css';
import {useDojo} from './DojoContext';
import {useComponentValue, useEntityQuery} from "@dojoengine/react";
import {Direction} from './dojo/createSystemCalls'
import {Utils} from '@dojoengine/core';
import {Has} from "@latticexyz/recs";

function App() {
    const {
        systemCalls: {create, commit, reveal, reset},
        components: {Game, Player},
    } = useDojo();


    // const entityId = BigInt(import.meta.env.VITE_ENTITY_ID);
    // const position = useComponentValue(Player, Utils.getEntityIdFromKeys([entityId]));
    // const moves = useComponentValue(Player, Utils.getEntityIdFromKeys([entityId]));


    return (
        <>
            <div className="card">
                <button onClick={() => create()}>Create</button>
            </div>
            <div className="card">
                {/*<button onClick={() => commit()}>Commit</button>*/}
            </div>
            <div className="card">
                {/*<button onClick={() => reveal()}>Reveal</button>*/}
            </div>
            <div className="card">
                {/*<button onClick={() => reset()}>Reset</button>*/}
            </div>

            {/*<div className="card">*/}
            {/*    <div>Moves Remaining: {moves ? `${moves['remaining']}` : 'Need to Spawn'}</div>*/}
            {/*</div>*/}

        </>
    );
}

export default App;
