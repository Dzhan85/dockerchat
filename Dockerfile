FROM node:alpine

WORKDIR /web

COPY . /web

RUN npm install --only=production

EXPOSE 3000

CMD [ "node", "server.js" ]