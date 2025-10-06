import { IncomingMessage } from "http";

export const logRequest = (req: IncomingMessage, start: number) => {
  const duration = Date.now() - start;
  console.log(`${req.method} ${req.url} - ${duration}ms`);
};
