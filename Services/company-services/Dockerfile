FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install&&npm cache clean --force
COPY ./src ./src
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npx","nodemon","--watch","src","src/app.ts"]