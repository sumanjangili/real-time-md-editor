# -------------------------------------------------
#  Builder stage – compile the React/TS app
# -------------------------------------------------
FROM node:20-bullseye-slim AS builder

# Set a deterministic working directory
WORKDIR /app

# --------- Install npm dependencies (cached) ----------
# Copy only the lockfiles first so Docker can cache this layer
COPY package.json package-lock.json ./

# Install exactly the versions locked in package‑lock.json
RUN npm ci --prefer-offline --no-audit --progress=false

# --------- Copy source code & build the static bundle ----------
# Now copy the rest of the source (everything else)
COPY . .

# Build the production bundle – the result will be in ./dist/
RUN npm run build

# -------------------------------------------------
#  Runtime stage – serve the static files with nginx
# -------------------------------------------------
FROM nginx:stable-alpine AS runtime

# nginx runs as the non‑root user `nginx` by default;
# we keep that default behaviour (no extra USER line needed).

# Copy the compiled assets from the builder into nginx’s html dir
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Expose the default HTTP port
EXPOSE 80

# The official nginx image already defines:
#   CMD ["nginx", "-g", "daemon off;"]
# so we don’t need to add a CMD ourselves.
