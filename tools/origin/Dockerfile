FROM debian:bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends bash ca-certificates curl git \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://downloads.cursor.com/origin/install.sh | sh \
  && install -m 755 /root/.local/bin/origin /usr/local/bin/origin

WORKDIR /src
