FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /ng-app

COPY package.json package-lock.json /ng-app/

RUN npm ci

ENV PATH="./node_modules/.bin:$PATH"

COPY . /ng-app/

RUN npm run build:prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:1.15

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /ng-app/dist/address-book-client/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
