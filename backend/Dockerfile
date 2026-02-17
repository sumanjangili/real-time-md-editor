# ---------- Builder ----------
FROM rust:1.78-alpine AS builder
WORKDIR /app
# Install required libs for building
RUN apk add --no-cache musl-dev openssl-dev protobuf-dev

# Cache dependencies
COPY backend/Cargo.toml backend/Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release && rm -rf src

# Copy source and build for real
COPY backend/. .
RUN cargo build --release

# ---------- Runtime ----------
FROM alpine:3.20 AS runtime
WORKDIR /app
RUN apk add --no-cache ca-certificates tzdata
COPY --from=builder /app/target/release/backend ./backend
COPY backend/.env ./
EXPOSE 8080
CMD ["./backend"]
