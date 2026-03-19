FROM node:24-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
CMD [ "npm", "start" ]