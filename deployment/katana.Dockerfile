FROM rust:1

RUN cargo install --git https://github.com/dojoengine/dojo --force katana

CMD ["katana", "--allow-zero-max-fee"]
