# Install node v8
FROM node:8

# Set the workdir /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .

# Copy .env.docker to workdir/.env - use the docker env
#COPY .env.docker ./.env

# Expose application ports - (4300 - for API and 4301 - for front end)
EXPOSE 3100

# Generate build
#RUN node app.js

# Start the application
CMD ["npm", "start"]
