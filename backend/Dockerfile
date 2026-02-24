# -------------------------------------------------
# Builder stage – Alpine + Rust nightly (musl target)
# -------------------------------------------------
FROM rustlang/rust:nightly-alpine AS builder
WORKDIR /app

# Install build‑time deps (musl, OpenSSL, pkg-config)
RUN apk add --no-cache musl-dev openssl-dev pkgconfig

# Ensure the musl target is present (usually already the default)
RUN rustup target add x86_64-unknown-linux-musl

# Cache Cargo metadata
COPY Cargo.toml Cargo.lock ./
RUN mkdir -p src && echo "fn main() {}" > src/main.rs && cargo fetch && rm -rf src

# Copy source and build
COPY . .
# Replace YOUR_BINARY_NAME with the actual binary name
RUN cargo build --release --target x86_64-unknown-linux-musl && \
    strip target/x86_64-unknown-linux-musl/release/real_time_md_editor_api

# -------------------------------------------------
# Runtime stage – tiny Alpine image
# -------------------------------------------------
FROM alpine:3.20 AS runtime
WORKDIR /app
RUN apk add --no-cache ca-certificates tzdata

# Copy the built binary (rename to ./backend if you like)
COPY --from=builder \
    /app/target/x86_64-unknown-linux-musl/release/real_time_md_editor_api \
    ./backend

# Run as non‑root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 8080
HEALTHCHECK CMD wget --quiet --spider http://localhost:8080/api/ping || exit 1
CMD ["./backend"]
