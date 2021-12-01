# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./



# Copy files or folders from source to the dest path in the image's filesystem.
COPY . .

#Define the network ports that this container will listen on at runtime.
EXPOSE 5000

# Run the web service on container startup.
CMD [ "npm", "start" ]