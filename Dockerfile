# Use official Node.js runtime as base image
FROM --platform=amd64 node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 80
EXPOSE 80

# Start the application
CMD ["npm", "run", "dev"]
