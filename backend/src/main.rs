//  Imports

use actix_cors::Cors;
use actix_web::{
    App, Error, HttpRequest, HttpResponse, HttpServer, Responder, get, middleware::Logger, web,
};
use actix_ws::{Message, Session}; // WebSocket session type
use dotenvy::dotenv;
use futures_util::StreamExt; // we only need StreamExt now
use std::env;
use std::sync::Arc;
use tokio::sync::Mutex; // ← async‑aware mutex

//  Shared state – a thread‑safe list of client sessions

type Clients = Arc<Mutex<Vec<Session>>>; // store Session objects

//  Simple health‑check endpoint (useful for probes)

#[get("/api/ping")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().body("pong")
}

//  WebSocket handler – registers the client and broadcasts text messages

async fn ws_handler(
    req: HttpRequest,
    stream: web::Payload,
    clients: web::Data<Clients>,
) -> Result<HttpResponse, Error> {
    // Perform the handshake. `handle` returns (upgrade response, session, message stream).
    let (resp, session, mut msg_stream) = actix_ws::handle(&req, stream)?;
    println!("✅ Handshake succeeded – new client registered");

    // Store the newly‑created session so we can broadcast to it later.
    {
        let mut lock = clients.lock().await; // async lock acquisition
        lock.push(session.clone());
    }

    // -------------------------------------------------------------------------
    //  Receive loop – forward any incoming text to **all** connected peers
    // -------------------------------------------------------------------------
    while let Some(msg) = msg_stream.next().await {
        let msg = msg?;

        log::info!("Received a WebSocket frame: {:?}", msg);

        if let Message::Text(txt) = msg {
            // Broadcast the text to every stored session.
            let mut lock = clients.lock().await; // async lock again

            // Iterate backwards so we can safely remove dead sockets.
            for i in (0..lock.len()).rev() {
                // `Session` has a `text` helper (no generic `send` method).
                if lock[i].text(txt.clone()).await.is_err() {
                    // Remove the client that errored (most likely disconnected).
                    lock.swap_remove(i);
                }
            }
        }
    }

    // -------------------------------------------------------------------------
    //  Cleanup – the client has disconnected.
    // -------------------------------------------------------------------------
    // The `session` will be dropped automatically when this function returns.
    // Because we already prune dead sessions in the broadcast loop, we don’t need
    // an explicit `id()`‑based removal here.

    // Return the upgrade response (the WebSocket handshake already succeeded).
    Ok(resp)
}

// Server bootstrap

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load .env variables (e.g., DATABASE_URL) and initialise logger
    dotenv().ok();
    env_logger::init();

    // Port can be overridden with BACKEND_PORT env var
    let port: u16 = env::var("BACKEND_PORT")
        .unwrap_or_else(|_| "8080".into())
        .parse()
        .expect("Invalid port");

    println!("🚀 Starting backend on http://0.0.0.0:{port}");

    // Create the globally‑shared client list (async‑aware mutex)
    let clients: Clients = Arc::new(Mutex::new(Vec::new()));

    HttpServer::new(move || {
        // For local development we allow everything; tighten for production
        let cors = Cors::permissive();

        App::new()
            .wrap(Logger::default())
            .wrap(cors)
            // Make the shared client list available to every request
            .app_data(web::Data::new(clients.clone()))
            .service(ping)
            .route("/ws", web::get().to(ws_handler))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
