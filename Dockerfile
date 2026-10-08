# syntax=docker/dockerfile:1

# Base: Node + pnpm (version comes from the "packageManager" field via Corepack)
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# All dependencies (incl. dev) needed for the build
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Production dependencies only, for the final image
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

# Build the app
FROM deps AS build
COPY . .
RUN pnpm build

# Slim runtime image, runs as non-root user
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node --from=prod-deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/build ./build
USER node
EXPOSE 3000
CMD ["node_modules/.bin/react-router-serve", "./build/server/index.js"]
