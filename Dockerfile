FROM node:14.8.0

ARG STORAGE_KEY

WORKDIR /app

RUN mkdir -p /app && \
    chown -R node:node /app

ADD . /app/

RUN npm ci && npm run build

ENV NODE_ENV='production'

USER 1000

EXPOSE 8080

ENTRYPOINT exec node dist/server.js

