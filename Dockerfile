FROM node:alpine AS deps
RUN apk add --no-cache git openssh g++ make py3-pip
RUN yarn global add node-gyp
WORKDIR /app

COPY package.json yarn.lock ./
RUN  yarn install --frozen-lockfile --production --ignore-scripts

#  ---------------------------------
FROM node:16-alpine AS builder
# RUN apk add --no-cache git openssh g++ make py3-pip
# RUN apk update && \
#     apk add --no-cache libc6-compat autoconf automake libtool make tiff jpeg zlib zlib-dev pkgconf nasm file gcc musl-dev


WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn run build

#  ---------------------------------
FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]
#  ---------------------------------


# # Use an official Node.js runtime as the base image
# FROM node:alpine AS builder

# # Set the working directory inside the container
# WORKDIR /app

# # Install build dependencies
# RUN apk add --no-cache git openssh g++ make py3-pip
# RUN yarn global add node-gyp
# # RUN apk add --no-cache git openssh g++ make py3-pip

# # Copy package.json and yarn.lock to the working directory
# COPY package*.json yarn.lock ./

# # Install project dependencies
# RUN yarn install --frozen-lockfile

# # Copy the rest of your application code
# COPY . .

# # Build the Next.js application
# RUN yarn build

# # Build the production image
# FROM node:alpine AS production
# RUN apk add --no-cache git openssh g++ make py3-pip

# # Set the working directory
# WORKDIR /app

# # Copy package.json and yarn.lock to the working directory
# COPY package*.json yarn.lock ./

# # Install production dependencies (ignore devDependencies)
# RUN yarn install --production --ignore-scripts

# # Copy the .env.production file
# COPY .env.production .env

# # Copy the built Next.js application
# COPY --from=builder /app/.next ./.next

# # Expose the port your Next.js app will run on
# EXPOSE 3000

# # Set environment variables
# ENV NODE_ENV=production

# # Start your Next.js app
# CMD ["node_modules/.bin/next", "start"]



# FROM node:alpine 
# WORKDIR /app

# RUN apk add --no-cache git openssh g++ make py3-pip
# RUN yarn global add node-gyp

# COPY package.json yarn.lock .
# RUN yarn install
# COPY . .
# EXPOSE 3000
# CMD ["yarn", "start"]


    # // "@mui/material": "^5.14.6",
    # // "@mui/x-date-pickers": "^6.12.0",