FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
ENV NODE_ENV=development
EXPOSE 3000
CMD ["nodemon", "src/server.ts"]

