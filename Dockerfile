# Use an official Node.js runtime as a parent image
FROM node:13-alpine

# Set the working directory to /app
WORKDIR /build/src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Define the command that will run when the container starts
CMD ["npm", "run", "dev"]