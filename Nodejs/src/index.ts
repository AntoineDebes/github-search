import express, { json, urlencoded } from "express";
import swaggerUI from "swagger-ui-express";
import * as swaggerDocs from "../swagger.json";
import cors from "cors";
import AppController from "./controller/AppController";

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.post("/api/search", AppController.search);

app.delete("/api/clear-cache", AppController.resetCache);

export default app;
