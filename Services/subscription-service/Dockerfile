FROM node:20-alpine


WORKDIR /src

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .


EXPOSE 3002

# Start the app
CMD ["npx", "ts-node", "src/app.ts"]
