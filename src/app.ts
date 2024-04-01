import express, { Application, Request, Response } from "express";
import cors from "cors";
import { BaseRouter } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";

const app: Application = express();
app.use(cors());

//Parsers
app.use(express.json());

// Route
app.use("/api", BaseRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Travel server running successfully!");
});

// Global error handler
app.use(globalErrorHandler);

//Handling not found
app.use(notFoundHandler);

export default app;
