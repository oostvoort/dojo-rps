FROM rust:1
WORKDIR /app

RUN cargo install --git https://github.com/dojoengine/dojo --force sozo torii
COPY ../contracts ./contracts

WORKDIR /app/contracts
RUN sozo build

CMD sh -c 'torii --manifest target/dev/manifest.json --world-address "$WORLD_ADDRESS" --rpc $RPC_URL'
