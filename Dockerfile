FROM node:18-alpine as web_node_deps

WORKDIR /app
COPY /web/package.json ./package.json
COPY /web/yarn.lock ./yarn.lock

# Install dependencies
RUN yarn install --frozen-lockfile

# Now copy all the sources so we can compile
FROM node:18-alpine AS web_node_builder
WORKDIR /app
COPY /web .
COPY --from=web_node_deps /app/node_modules ./node_modules

# Build the webapp
RUN yarn build --mode production

FROM oostvoort/dojo:v0.2.2 AS contracts_builder
WORKDIR /app
COPY /contracts .
RUN sozo build

FROM oostvoort/dojo-forkserver:v1.1.6 AS runtime

WORKDIR /opt
COPY --from=contracts_builder /app/target ./contracts/target/
COPY --from=web_node_builder /app/dist static/

COPY ./contracts/Scarb.toml contracts/Scarb.toml
COPY ./contracts/scripts contracts/scripts
COPY ./contracts/.env.development .env

HEALTHCHECK CMD (curl --fail http://localhost:3000 && curl --fail http://localhost:5050) || exit 1

CMD ["/opt/server"]
