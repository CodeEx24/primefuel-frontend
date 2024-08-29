# docker build -t my-app:latest .

# docker run -d -p 3000:3000 --name my-app-container my-app:latest

# docker stop my-app-container

# Set the base image to create the image for the React app
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
# These files are needed to install the Node.js dependencies
COPY package.json package-lock.json ./

# Install the Node.js dependencies listed in package.json
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Build the React app, outputting the static files to the build directory
RUN npm run build

# Install the serve package globally to serve static files
RUN npm install -g serve

# Copy the build output from the dist directory to the build directory in the container
# This directory will be served by the serve package
COPY ./dist ./build

# Inform Docker that the container will listen on port 3000
EXPOSE 3000

# Set the default command to start the serve server
# Serve the static files from the build directory on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
