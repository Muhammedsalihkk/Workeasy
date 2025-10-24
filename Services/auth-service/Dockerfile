FROM node:20-alpine AS Builder

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY  package*.json ./

RUN npm install --omit=dev

COPY  --from=Builder app/dist /app/dist

CMD [ "npm","start" ]
