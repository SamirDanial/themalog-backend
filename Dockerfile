# Use Node.js as the base image
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code into the container
COPY . .

# Build the NestJS application
RUN npm run build

# Use a smaller base image for the production environment
FROM node:20-alpine AS production

WORKDIR /app

# Copy built files and installed dependencies from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma 

# Expose the NestJS port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main"]
