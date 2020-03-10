FROM node:13-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node","./bin/www" ]