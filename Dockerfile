FROM node:12.14.1-stretch as build

WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json .

COPY package-lock.json .

RUN npm i

COPY angular.json .

COPY tsconfig.json .

COPY tslint.json .

COPY src src

RUN npm run build-prod

FROM nginx:1.19.10-alpine

COPY --from=build /app/dist/beatstars-challenge /usr/share/nginx/html

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY config/beatstars-challenge-app.conf /etc/nginx/conf.d/default.conf
