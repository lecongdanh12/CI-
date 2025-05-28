# Use the official Node.js image as the base image
# The 'lts' tag is used for the latest Long-Term Support version
FROM node:lts

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application will run on (default for many Node.js apps is 3000)
EXPOSE 10000

# Build the app
RUN npm run build

# Define the command to run your application
CMD ["node", "dist/app.js"]
