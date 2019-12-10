FROM node:12.13.1-alpine3.9

WORKDIR /opt/app

COPY . .

ARG VERSION

ENV VERSION=${VERSION}

RUN npm i --no-audit

RUN npm run build:server

RUN npm prune --production --no-audit

CMD node "build/${VERSION}/server.bundle.js"
