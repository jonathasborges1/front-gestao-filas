import http from "node:http";

const PORT = 7070;
const clients = new Set();

// ---------- Utils: geração de nomes ----------
const FIRST_NAMES = ["Carlos", "Pedro", "Ana", "Julia", "Marcos", "Beatriz", "Rafaela", "Tiago", "Fernanda"];
const LAST_NAMES  = ["Lima", "Souza", "Almeida", "Silva", "Oliveira", "Santos", "Pereira", "Gomes", "Martins"];
function randomName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last  = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const last2 = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last} ${last2}`;
}

// ---------- Utils: geração de placas ----------
function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randChar() { return String.fromCharCode(65 + Math.floor(Math.random() * 26)); } // A-Z
function randDigit() { return String(Math.floor(Math.random() * 10)); } // 0-9

// Antigo: LLL-9999 (às vezes sem hífen)
function generateOldPlate() {
  const letters = randChar() + randChar() + randChar();
  const digits = randDigit() + randDigit() + randDigit() + randDigit();
  const withHyphen = Math.random() < 0.6; // maioria com hífen
  const plate = withHyphen ? `${letters}-${digits}` : `${letters}${digits}`;
  return maybeMessy(plate);
}

// Mercosul (Brasil): LLL9L99
function generateMercosulPlate() {
  const letters3 = randChar() + randChar() + randChar();
  const n1 = randDigit();
  const l1 = randChar();
  const n2 = randDigit() + randDigit();
  const plate = `${letters3}${n1}${l1}${n2}`;
  return maybeMessy(plate);
}

// Adiciona "ruído" para testar normalização do front:
// - minúsculas às vezes
// - espaços aleatórios antes/depois/entre pedaços
function maybeMessy(plate) {
  let out = plate;
  // 35%: tudo minúsculo
  if (Math.random() < 0.35) out = out.toLowerCase();
  // 30%: adicionar espaços aleatórios (ex.: "ABC 1C34" ou "ABC- 1234")
  if (Math.random() < 0.3) {
    const idx = Math.max(1, Math.min(out.length - 2, Math.floor(Math.random() * out.length)));
    out = out.slice(0, idx) + " " + out.slice(idx);
  }
  // 20%: espaços no início/fim
  if (Math.random() < 0.2) out = ` ${out} `;
  return out;
}

// Alterna formatos para novos motoristas
function randomPlate() {
  return Math.random() < 0.5 ? generateOldPlate() : generateMercosulPlate();
}

// ---------- Estado global do mock ----------
let drivers = [
  // já começa com mix de formatos
  { driverName: "Dwilson Vieira Santos", plate: "PHS2B97", status: "WaitingLoading" }, // Mercosul
  { driverName: "João Gomes",            plate: "PHF-3490", status: "WaitingLoading" }, // Antigo com hífen
  { driverName: "Maria Souza",           plate: "nol2a33",  status: "WaitingLoading" }, // Mercosul minúsculas
  { driverName: "Rafael Martins",        plate: "ABC1234",  status: "Finished" },       // Antigo sem hífen
  { driverName: "Ana Clara",             plate: "XYZ9H45",  status: "InLoading" },      // Mercosul
];
let currentCall = null;

// ---------- Helpers ----------
function advanceQueue() {
  // Se tiver alguém esperando, coloca em loading e gera currentCall
  const waiting = drivers.find(d => d.status === "WaitingLoading");
  if (waiting) {
    waiting.status = "InLoading";
    currentCall = {
      scheduleNumber: String(500000 + Math.floor(Math.random() * 999)),
      driverName: waiting.driverName,
      plate: waiting.plate,
      message: "Dirija-se à portaria",
      calledAt: new Date().toISOString(),
    };
    return;
  }

  // Se tiver alguém em loading, eventualmente finaliza
  const inLoading = drivers.find(d => d.status === "InLoading");
  if (inLoading && Math.random() < 0.6) {
    inLoading.status = "Finished";
    currentCall = null;
  }

  // Às vezes entra novo motorista na fila (com placa em qualquer padrão)
  if (Math.random() > 0.5) {
    drivers.push({
      driverName: randomName(),
      plate: randomPlate(),
      status: "WaitingLoading",
    });
  }

  // Limpa histórico muito velho para não crescer infinito
  if (drivers.length > 200) {
    drivers = drivers.slice(-120);
  }
}

function buildPayload() {
  const recentCalls = drivers
    .filter(d => d.status !== "WaitingLoading")
    .slice(-5) // últimos 5 registros
    .map(d => ({
      driverName: d.driverName,
      plate: d.plate,
      status: d.status, // "Finished" | "InLoading"
      icon: d.status === "InLoading" ? "loading" : "check",
      timestamp: new Date().toISOString(),
    }));

  const totals = {
    waitingLoading: drivers.filter(d => d.status === "WaitingLoading").length,
    inLoading:      drivers.filter(d => d.status === "InLoading").length,
    finished:       drivers.filter(d => d.status === "Finished").length,
  };

  return { currentCall, recentCalls, totals };
}

// ---------- Servidor HTTP SSE ----------
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

// ---------- Loop principal ----------
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
