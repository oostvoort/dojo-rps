FROM debian

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    jq \
    git-all \
    build-essential \
    curl

# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc

# Install dojo
SHELL ["/bin/bash", "-c"]
RUN curl -L https://install.dojoengine.org | bash
RUN source ~/.bashrc
ENV PATH="/root/.dojo/bin:${PATH}"
RUN dojoup

# install scarb
SHELL ["/bin/bash", "-c"]
RUN curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | bash
RUN echo 'source $HOME/.bashrc' >> $HOME/.bashrc
ENV PATH="/root/.scarb/bin:${PATH}"

WORKDIR /app
COPY ../contracts ./contracts

WORKDIR /app/contracts

CMD sh -c 'sozo build && sozo migrate --rpc-url $RPC_URL && /root/.local/bin/scarb run post_deploy $RPC_URL'
