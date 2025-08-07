FROM node:20-alpine


WORKDIR /src

COPY package*.json ./
RUN npm install && npm cache clean --force

# Copy the rest of the application
COPY . .

# Optional: Normalize line endings (in case you're on Windows)

# Expose the application port
EXPOSE 3002

# Start the app
CMD ["npx", "ts-node", "src/app.ts"]
