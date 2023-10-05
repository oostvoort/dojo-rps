#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export WORLD_ADDRESS=$1;
export PRIVATE_KEY=$2;
export ACCOUNT_ADDRESS=$3;

# make sure all components/systems are deployed
COMPONENTS=("Game" "Player")
SYSTEMS=("commit" "create" "reset" "reveal")

# check components
for component in ${COMPONENTS[@]}; do
    sozo component entity --world $WORLD_ADDRESS $component
done

# check systems
for system in ${SYSTEMS[@]}; do
    SYSTEM_OUTPUT=$(sozo system get --world $WORLD_ADDRESS $system)
    if [[ "$SYSTEM_OUTPUT" == "0x0" ]]; then
        echo "Error: $system is not deployed"
        exit 1
    fi
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component commit --world $WORLD_ADDRESS --private-key $PRIVATE_KEY --account-address $ACCOUNT_ADDRESS
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component create --world $WORLD_ADDRESS --private-key $PRIVATE_KEY --account-address $ACCOUNT_ADDRESS
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component reset --world $WORLD_ADDRESS --private-key $PRIVATE_KEY --account-address $ACCOUNT_ADDRESS
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component reveal --world $WORLD_ADDRESS --private-key $PRIVATE_KEY --account-address $ACCOUNT_ADDRESS
done

echo "create init game."
sozo execute create --world $WORLD_ADDRESS --private-key $PRIVATE_KEY --account-address $ACCOUNT_ADDRESS

echo "Default authorizations have been successfully set."
