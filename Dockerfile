FROM node:latest

WORKDIR /app/
ADD . .

RUN npm install

ENTRYPOINT ["npm", "run", "dev"]