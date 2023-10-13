
# Use an official Node.js runtime as the base image
FROM node:18.18.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json yarn.lock ./

# Install project dependencies
RUN yarn global add node-gyp
RUN yarn install
# RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production 
# RUN yarn build
# RUN npm run build
RUN npm run build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Define the command to start your Next.js app
# CMD ["npm", "start"]
CMD ["yarn", "start"]
