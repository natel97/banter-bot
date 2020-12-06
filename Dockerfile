FROM node:14.5.0-alpine3.10
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN apk add make python3 gcc g++ ffmpeg
RUN yarn
COPY new-connection.mp3 ./
COPY ./src ./src
ENTRYPOINT yarn start
