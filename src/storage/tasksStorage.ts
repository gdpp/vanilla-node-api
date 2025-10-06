import fs from "fs";
import path from "path";
import { Task } from "../models/task";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_FILE = path.join(__dirname, "tasks.json");

let tasks: Task[] = [];

// Cargar tareas desde archivo
export const loadTasks = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      tasks = JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error loading tasks:", err);
    tasks = [];
  }
};

// Guardar tareas en archivo
export const saveTasks = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
};

// Acceso a las tareas
export const getTasks = () => tasks;

export const setTasks = (newTasks: Task[]) => {
  tasks = newTasks;
  saveTasks();
};
