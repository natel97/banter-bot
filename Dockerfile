FROM node:14.5.0-alpine3.10
RUN apk add make python3 gcc g++ ffmpeg
ARG TOKEN
ARG BOT_CHANNEL
ENV TOKEN=$TOKEN
ENV BOT_CHANNEL=$BOT_CHANNEL
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn
COPY new-connection.mp3 ./
COPY ./src ./src
RUN yarn build
ENTRYPOINT yarn start
