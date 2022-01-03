import express, { json, Request, Response, urlencoded } from "express";
import swaggerUI from "swagger-ui-express";
import { createClient } from "redis";
import * as swaggerDocs from "../swagger.json";
import cors from "cors";
import Axios from "axios";

// Models

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
    return response.status(400).json({ message: "Missing information" });

  const [model]: any = await client.SMEMBERS(
    `${searchTarget}${searchName}:${pageRange}`
  );

  if (model) {
    return response.status(200).json({ [searchTarget]: JSON.parse(model) });
  } else {
    await Axios.get(
      `https://api.github.com/search/${searchTarget}?q=${searchName}&page=${pageRange}`
    )
      .then(async (res: any) => {
        const dataToString = JSON.stringify(res.data.items);

        if (!!!res.data.items.length)
          return response.status(404).json({ message: "No data found" });

        await (client.SADD(
          `${searchTarget}${searchName}:${pageRange}`,
          dataToString
        ) &&
          client.EXPIRE(
            `${searchTarget}${searchName}:${pageRange}`,
            60 * 60 * 2
          ));

        return response
          .status(200)
          .json({ [searchTarget]: JSON.parse(dataToString) });
      })
      .catch((err: Error) => {
        return response.status(500).json({ message: err.message });
      });
  }
});

app.delete("/api/clear-cache", async (response: Response) => {
  const flushAllCashedItems = await client.flushAll();
  if (flushAllCashedItems)
    return response
      .status(200)
      .json({ message: "Server deleted all the cached data successfully" });
  return response
    .status(500)
    .json({ message: "Error in deleting Cached data" });
});

export default app;
