FROM rust:1-buster

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    jq \
    libc6

RUN dpkg -L libc6 | grep -i libc.so.6


# Install dojo
SHELL ["/bin/bash", "-c"]
RUN curl -L https://install.dojoengine.org | bash
RUN source ~/.bashrc
ENV PATH="/root/.dojo/bin:${PATH}"
RUN dojoup

CMD ["katana", "--allow-zero-max-fee"]
