FROM node:18 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "index.js" ]