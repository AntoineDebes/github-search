import express, { json, Request, Response, urlencoded } from "express";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";
import { createClient } from "redis";
import * as swaggerDocs from "../swagger.json";
import cors from "cors";
import Axios from "axios";

// Models
interface PaginationFunctionModel {
  model: string;
  pageRange: number;
}
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

const client = createClient();
(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
})();

// Controller

app.post("/api/search", async (request: Request, response: Response) => {
  const { searchName, searchTarget, pageRange } = request.body;
  if (!searchName || !searchTarget)
    return response.status(400).json({ message: "Missing informations" });

  const model: any = await client.SMEMBERS(`${searchTarget}:${searchName}`);
  if (model.length) {
    return response
      .status(200)
      .json(paginationFunction({ model: model[0], pageRange }));
  } else {
    await Axios.get(
      `https://api.github.com/search/${searchTarget}?q=${searchName}`
    )
      .then(async (res: any) => {
        const dataToString = JSON.stringify(Object.entries(res.data.items));

        if (!!!res.data.items.length)
          return response.status(404).json({ message: "No data" });

        await (client.SADD(`${searchTarget}:${searchName}`, dataToString) &&
          client.EXPIRE(`${searchTarget}:${searchName}`, 60 * 60 * 2));

        return response
          .status(200)
          .json(paginationFunction({ model: dataToString, pageRange }));
      })
      .catch((_) => {
        return response.status(500).json({ message: "Internal server Error" });
      });
  }
});

app.delete("/api/clear-cache", async (response: Response) => {
  const flushAllCashedItems = await client.flushAll();
  if (flushAllCashedItems)
    return response
      .status(200)
      .json({ message: "Server deleted all the cached items successfully" });
  return response
    .status(500)
    .json({ message: "Error in deleting Cached information" });
});

// Services

const paginationFunction = ({ model, pageRange }: PaginationFunctionModel) => {
  const paginationPage = (pageRange - 1) * 20;
  const modelParsed = JSON.parse(model);
  if (modelParsed.length < paginationPage)
    return { message: "No more results" };
  const results = modelParsed.splice(paginationPage, 20);
  return results;
};

export default app;
