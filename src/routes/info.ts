import { ServerResponse } from "http";
import os from "os";

export const handleInfo = (res: ServerResponse) => {
  const info = {
    platform: os.platform(),
    cpu: os.cpus()[0].model,
    memory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(info));
};
