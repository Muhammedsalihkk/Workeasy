FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM node:20-alpine as runner

WORKDIR /app

COPY package*.json ./

RUN npm install  omit=dev

COPY --from=builder /app/dist ./dist

CMD [ "npm","Start" ]



