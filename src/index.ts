// server.ts
import http from "http";
import { handleTasks } from "./routes/tasks";
import { handleInfo } from "./routes/info";
import { logRequest } from "./middlewares/logger";
import { loadTasks } from "./storage/tasksStorage";

// Cargar tareas al inicio
loadTasks();

// Crear servidor
const server = http.createServer(async (req, res) => {
  const start = Date.now();
  res.on("finish", () => logRequest(req, start));

  if (!req.url) return;

  if (req.url === "/tasks" || req.url?.startsWith("/tasks/")) {
    return handleTasks(req, res);
  }

  if (req.url === "/info") {
    return handleInfo(res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

server.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
