# NodeJS + Typescript Basic vanilla server

## Overview

Simple project to practice vanilla nodejs + typescript creating a tasks api with file storage

## Structure

project/
│
├─ index.ts # punto de entrada
├─ routes/
│ ├─ tasks.ts # lógica de /tasks
│ └─ info.ts # lógica de /info
├─ middleware/
│ └─ logger.ts # middleware de logging
├─ models/
│ └─ task.ts # interfaz Task
├─ storage/
│ └─ tasksStorage.ts # cargar/guardar tareas
