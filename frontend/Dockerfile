# ---------- Builder ----------
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Install dependencies (cached)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build the static bundle
COPY . .
RUN npm run build   # expected output: ./dist/

# ---------- Runtime ----------
# Serve the built assets with a tiny nginx image
FROM nginx:stable-alpine AS runtime

# Copy the built assets into nginx’s default html directory
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Expose the HTTP port
EXPOSE 80

# No CMD needed – the nginx base image already runs in the foreground.
