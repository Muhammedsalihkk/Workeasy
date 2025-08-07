FROM node:20-alpine

WORKDIR /src

COPY package*.json ./
RUN npm install && npm cache clean --force

# Copy the rest of the code
COPY . .

# Convert Windows line endings to Unix


# Expose port
EXPOSE 3003

# Final command to run the app
CMD ["npx", "ts-node", "src/app.ts"]
