FROM node:10

WORKDIR /ng-app

COPY package*.json /ng-app/

COPY . /ng-app/

RUN npm install

EXPOSE 4201

CMD ["npm", "start"]
