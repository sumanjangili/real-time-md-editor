use actix_cors::Cors;
use actix_web::{
    get, middleware::Logger, web, App, HttpResponse, HttpServer, Responder,
};
use dotenvy::dotenv;
use std::env;

/// Health‑check endpoint
#[get("/api/ping")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().body("pong")
}

/// Placeholder for future WebSocket route
async fn ws_handler() -> impl Responder {
    HttpResponse::NotImplemented().finish()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load .env variables (e.g., DATABASE_URL)
    dotenv().ok();
    env_logger::init();

    // Port can be overridden with BACKEND_PORT env var
    let port: u16 = env::var("BACKEND_PORT")
        .unwrap_or_else(|_| "8080".into())
        .parse()
        .expect("Invalid port");

    println!("🚀 Starting backend on http://0.0.0.0:{port}");

    HttpServer::new(|| {
        let cors = Cors::permissive(); // tighten later for production
        App::new()
            .wrap(Logger::default())
            .wrap(cors)
            .service(ping)
            .route("/ws", web::get().to(ws_handler))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
