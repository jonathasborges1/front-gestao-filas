import http from "node:http";

const PORT = 7070;
const clients = new Set();

const examplePayload = () => ({
  currentCall: {
    scheduleNumber: String(500000 + Math.floor(Math.random()*999)),
    driverName: ["Dwilson Vieira Santos","João Gomes","Maria Souza"][Math.floor(Math.random()*3)],
    plate: ["PHS2B97","PHF3490","NOL2A33"][Math.floor(Math.random()*3)],
    message: "Dirija-se à portaria",
    calledAt: new Date().toISOString(),
  },
  recentCalls: [
    { driverName:"João Gomes", plate:"PHF3490", status:"InLoading", icon:"loading", timestamp:new Date().toISOString() },
    { driverName:"João Gomes", plate:"PHF3490", status:"Finished",  icon:"check",   timestamp:new Date(Date.now()-600000).toISOString() },
    { driverName:"Maria Souza", plate:"NOL2A33", status:"InLoading", icon:"loading", timestamp:new Date(Date.now()-900000).toISOString() },
    { driverName:"Carlos Lima", plate:"ABC1D23", status:"Finished",  icon:"check",   timestamp:new Date(Date.now()-1200000).toISOString() },
  ],
  totals: { waitingLoading: 3, inLoading: 2, finished: 7 },
});

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
    res.writeHead(404); res.end();
  }
});

setInterval(() => {
  const payload = JSON.stringify(examplePayload());
  for (const res of clients) {
    res.write(`event: Broadcast\n`);
    res.write(`data: ${payload}\n\n`);
  }
   
  console.log("Broadcast sent to", clients.size, "client(s)");
}, 7000);

server.listen(PORT, () => console.log(`SSE mock on http://localhost:${PORT}`));