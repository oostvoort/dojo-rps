#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export DOJO_WORLD_ADDRESS="0x79a3c37167370f03882049edbb291a4c8b79b988835184a18a0695f4dc4fe0c"

# make sure all components/systems are deployed
COMPONENTS=("Game" "Player")
SYSTEMS=("commit" "create" "reset" "reveal")

# check components
for component in ${COMPONENTS[@]}; do
    sozo component entity $component --rpc-url $1
done

# check systems
for system in ${SYSTEMS[@]}; do
    SYSTEM_OUTPUT=$(sozo system get $system --rpc-url $1)
    if [[ "$SYSTEM_OUTPUT" == "0x0" ]]; then
        echo "Error: $system is not deployed"
        exit 1
    fi
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component commit --rpc-url $1
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component create --rpc-url $1
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component reset --rpc-url $1
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component reveal --rpc-url $1
done

echo "create init game."
sozo execute create --rpc-url $1

echo "Default authorizations have been successfully set."
