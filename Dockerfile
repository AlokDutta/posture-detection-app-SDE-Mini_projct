# Use the official Node.js image
FROM node:14-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including http-server)
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port http-server will run on (default 8080)
EXPOSE 8080

# Start the server using http-server
CMD ["http-server", "-p", "8080"]

