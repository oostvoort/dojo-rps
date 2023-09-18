#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export DOJO_WORLD_ADDRESS="0x7aa3ed953a585361754b7f990a4fd37d3b2c98b630a007410ac9337dad1ac84"

# make sure all components/systems are deployed
COMPONENTS=("Game" "Player")
SYSTEMS=("commit" "create" "reset" "reveal")

# check components
for component in ${COMPONENTS[@]}; do
    sozo component entity $component
done

# check systems
for system in ${SYSTEMS[@]}; do
    SYSTEM_OUTPUT=$(sozo system get $system)
    if [[ "$SYSTEM_OUTPUT" == "0x0" ]]; then
        echo "Error: $system is not deployed"
        exit 1
    fi
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component commit
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component create
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component reset
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component reveal
done

echo "create init game."
sozo execute create

echo "Default authorizations have been successfully set."
