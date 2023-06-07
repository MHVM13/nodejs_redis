FROM node:alpine

WORKDIR /app

COPY . ./

RUN npm install

CMD ["node", "main.js"]
