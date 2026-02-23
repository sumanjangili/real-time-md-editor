# ---------- Builder stage (Rust compilation) ----------
# Use a concrete nightly image that exists on Docker Hub.
# `rust:nightly-slim-bullseye` is a slim Debian Bullseye base with the
# latest nightly toolchain (includes Cargo that understands edition = "2024").
FROM rust:1.81-slim-bullseye AS builder

WORKDIR /app

# Install build‑time dependencies (musl tools, OpenSSL headers,
# protobuf compiler, pkg‑config). Required for native crates.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        musl-tools \
        libssl-dev \
        protobuf-compiler \
        pkg-config && \
    rm -rf /var/lib/apt/lists/*

# -----------------------------------------------------------------
# Cache Cargo metadata first (helps Docker reuse layers)
# -----------------------------------------------------------------
COPY Cargo.toml Cargo.lock ./
# Dummy src/main.rs so `cargo fetch` works before we copy the real source.
RUN mkdir -p src && echo "fn main() {}" > src/main.rs && cargo fetch

# -----------------------------------------------------------------
# Copy the actual source code and build the release binary
# -----------------------------------------------------------------
COPY . .
RUN cargo build --release && rm -rf src   # clean up the dummy src dir

# ---------- Runtime stage (tiny Alpine) ----------
FROM alpine:3.20 AS runtime

WORKDIR /app

# Minimal runtime packages (certificates & timezone data)
RUN apk add --no-cache ca-certificates tzdata

# Pull the compiled binary from the builder stage
COPY --from=builder /app/target/release/backend ./backend

# Expose the port the binary listens on (adjust if needed)
EXPOSE 8080

# Entrypoint
CMD ["./backend"]
