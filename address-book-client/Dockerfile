# Stage 1
FROM node:10-alpine as build-step

RUN mkdir -p /ng-app

WORKDIR /ng-app

COPY package*.json /ng-app/

RUN npm install

COPY . /ng-app

RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine

COPY --from=build-step /ng-app/dist/address-book-client /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
