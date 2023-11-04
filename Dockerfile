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
# FROM node:16-alpine AS runner
FROM --platform=linux/amd64 node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/public ./public

USER nextjs

ENV PORT 3000

# ENV PORT 3000 / 8080 / 80
CMD ["yarn", "start"]
#  -------------------------------------
