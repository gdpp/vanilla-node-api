// routes/tasks.ts
import { IncomingMessage, ServerResponse } from "http";
import { Task } from "../models/task";
import { getTasks, setTasks, saveTasks } from "../storage/tasksStorage";

export const getRequestBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("JSON inválido"));
      }
    });
  });
};

export const handleTasks = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const tasks = getTasks();

  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(tasks));
  }

  if (req.method === "POST") {
    try {
      const data = await getRequestBody(req);
      if (!data.title) throw new Error("Title es requerido");

      const newTask: Task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: data.title,
        done: !!data.done,
      };
      tasks.push(newTask);
      setTasks(tasks);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newTask));
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  if (req.method === "PUT" || req.method === "DELETE") {
    try {
      const id = parseInt(req.url?.split("/")[2] || "");
      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) throw new Error("Tarea no encontrada");

      if (req.method === "PUT") {
        const data = await getRequestBody(req);
        const task = tasks[taskIndex];
        if (data.title !== undefined) task.title = data.title;
        if (data.done !== undefined) task.done = data.done;
        tasks[taskIndex] = task;
        setTasks(tasks);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(task));
      }

      if (req.method === "DELETE") {
        const deleted = tasks.splice(taskIndex, 1)[0];
        setTasks(tasks);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(deleted));
      }
    } catch (err: any) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  res.writeHead(405, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ error: "Método no permitido" }));
};
