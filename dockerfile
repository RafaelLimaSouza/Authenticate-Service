FROM node:10.13.0-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3333

CMD yarn add 'reflect-metadata'

CMD yarn run dev:server



