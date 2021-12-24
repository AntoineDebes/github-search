import express, { json, Request, Response, Router, urlencoded } from "express";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";

import * as swaggerDocs from "../swagger.json";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(urlencoded({ extended: true }));
app.use(json({ limit: "10mb" }));
app.use(cors());

Routers.forEach((router: any) => {
  router.forEach((route: RouteModelServer) => {
    (app as any)[route.method](
      route.route,
      route.middleware ?? [],
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          return result
            .then((result) => (!!result ? res.send(result) : undefined))
            .catch(() => next());
        } else if (!!result) {
          return res.json(result);
        }
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
