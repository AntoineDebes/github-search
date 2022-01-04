import { Request, Response } from "express";
import client from "../redisClient";
import AppServices from "../service/AppSerice";

const AppController = {
  search: async (request: Request, response: Response) => {
    const { searchName, searchTarget, pageRange } = request.body;
    if (!searchName || !searchTarget || !pageRange) {
      return response.status(400).json({ message: "Missing information" });
    }
    try {
      return response.status(200).json(
        await AppServices.redisFetchData({
          searchName,
          searchTarget,
          pageRange,
        })
      );
    } catch (err) {
      return response.status(404).json({
        message: err.message,
      });
    }
  },
  resetCache: async (request: Request, response: Response) => {
    try {
      return response.status(200).json(await AppServices.flushAllData());
    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  },
};
export default AppController;
