# -------------------------------------------------
#  Builder stage – Nightly Rust (edition 2024 ready)
# -------------------------------------------------
FROM rustlang/rust:nightly-slim AS builder   

WORKDIR /app

# -------------------------------------------------
# Install native build‑time dependencies
# -------------------------------------------------
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        musl-tools \
        libssl-dev \
        protobuf-compiler \
        pkg-config && \
    rm -rf /var/lib/apt/lists/*

# -------------------------------------------------
# Cache Cargo metadata (Cargo.toml + Cargo.lock)
# -------------------------------------------------
COPY Cargo.toml Cargo.lock ./

# Dummy source file – needed so `cargo fetch` works before we copy the real code
RUN mkdir -p src && \
    echo "fn main() {}" > src/main.rs && \
    cargo fetch

# -------------------------------------------------
# Copy the actual source code and build the release binary
# -------------------------------------------------
COPY . .

# Build the release binary (replace `backend` with your binary name if different)
RUN cargo build --release && \
    rm -rf src   # clean up the dummy src directory

# -------------------------------------------------
# Runtime stage – tiny Alpine image
# -------------------------------------------------
FROM alpine:3.20 AS runtime

WORKDIR /app

# Minimal runtime packages (certificates & timezone data)
RUN apk add --no-cache ca-certificates tzdata

# Copy the compiled binary from the builder stage.
COPY --from=builder /app/target/release/backend ./backend

# Expose the port your Actix‑Web server listens on (adjust if needed)
EXPOSE 8080

# Entrypoint – run the binary
CMD ["./backend"]
