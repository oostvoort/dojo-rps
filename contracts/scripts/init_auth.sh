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

# P1="0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0"
# P2="0x033c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c"


# for component in ${ALL_COMPONENTS[@]}; do
#     sozo execute grant_owner_system -c $P1,$component
#     sozo execute grant_owner_system -c $P2,$component
# done

#make ecs_exe s=create
## Usage: make ecs_exe s=Spawn
#ecs_exe:
#	@WORLD_ADDR=$$(tail -n1 ./last_deployed_world); \
#	cd contracts; echo "sozo execute $(s) --world $$WORLD_ADDR -c $(c)"; \
#	sozo execute $(s) --world $$WORLD_ADDR
echo "create init game."
sozo execute create

echo "Default authorizations have been successfully set."
