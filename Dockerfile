# Use an official Node.js runtime as the base image
FROM node:alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git openssh g++ make py3-pip
RUN yarn global add node-gyp
# RUN apk add --no-cache git openssh g++ make py3-pip

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install project dependencies

RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN yarn build

# Build the production image
FROM node:alpine AS production
RUN apk add --no-cache git openssh g++ make py3-pip

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install production dependencies (ignore devDependencies)
RUN yarn install --production --ignore-scripts

# Copy the .env.production file
COPY .env.production .env

# Copy the built Next.js application
COPY --from=builder /app/.next ./.next

# Expose the port your Next.js app will run on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start your Next.js app
CMD ["node_modules/.bin/next", "start"]
