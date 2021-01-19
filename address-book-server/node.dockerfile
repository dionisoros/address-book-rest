#our very first node image

FROM node:alpine

LABEL author="Dio"

ENV NODE_ENV=development
ENV PORT=3001

COPY . /node-server/

WORKDIR /node-server

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
