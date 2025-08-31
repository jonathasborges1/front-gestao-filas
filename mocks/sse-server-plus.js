import http from "node:http";

const PORT = 7070;
const clients = new Set();

// ---- Estado global do mock ----
let drivers = [
  { driverName: "Dwilson Vieira Santos", plate: "PHS2B97", status: "waitingLoading" },
  { driverName: "João Gomes", plate: "PHF3490", status: "waitingLoading" },
  { driverName: "Maria Souza", plate: "NOL2A33", status: "waitingLoading" },
];
let currentCall = null;

// ---- Helpers ----
function advanceQueue() {
  // Se tiver alguém esperando, coloca em loading
  const waiting = drivers.find(d => d.status === "waitingLoading");
  if (waiting) {
    waiting.status = "inLoading";
    currentCall = {
      scheduleNumber: String(500000 + Math.floor(Math.random() * 999)),
      driverName: waiting.driverName,
      plate: waiting.plate,
      message: "Dirija-se à portaria",
      calledAt: new Date().toISOString(),
    };
    return;
  }

  // Se tiver alguém em loading há tempo suficiente → finished
  const inLoading = drivers.find(d => d.status === "inLoading");
  if (inLoading) {
    inLoading.status = "finished";
    currentCall = null;
  }

  // Às vezes entra novo motorista na fila
  if (Math.random() > 0.6) {
    drivers.push({
      driverName: ["Carlos Lima", "Pedro Souza", "Ana Clara"][Math.floor(Math.random() * 3)],
      plate: ["ABC1D23", "XYZ9H45", "QWE4R56"][Math.floor(Math.random() * 3)],
      status: "waitingLoading",
    });
  }
}

function buildPayload() {
  const recentCalls = drivers
    .filter(d => d.status !== "waitingLoading")
    .slice(-5) // últimos 5 registros
    .map(d => ({
      driverName: d.driverName,
      plate: d.plate,
      status: d.status,
      icon: d.status === "inLoading" ? "loading" : "check",
      timestamp: new Date().toISOString(),
    }));

  const totals = {
    waitingLoading: drivers.filter(d => d.status === "waitingLoading").length,
    inLoading: drivers.filter(d => d.status === "inLoading").length,
    finished: drivers.filter(d => d.status === "finished").length,
  };

  return { currentCall, recentCalls, totals };
}

// ---- Servidor HTTP SSE ----
const server = http.createServer((req, res) => {
  if (req.url === "/realtime/queue/stream") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    clients.add(res);
    req.on("close", () => clients.delete(res));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// ---- Loop principal ----
setInterval(() => {
  advanceQueue();
  const payload = JSON.stringify(buildPayload());
  for (const res of clients) {
    res.write(`event: Broadcast\n`);
    res.write(`data: ${payload}\n\n`);
  }
  console.log("Broadcast sent to", clients.size, "client(s)", payload);
}, 7000);

server.listen(PORT, () => console.log(`SSE mock on http://localhost:${PORT}`));
