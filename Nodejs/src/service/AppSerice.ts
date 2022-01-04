import client from "../redisClient";
import Axios from "axios";
const AppServices = {
  redisFetchData: async ({ searchName, searchTarget, pageRange }) => {
    const [model]: any[] = await client.SMEMBERS(
      `${searchTarget}${searchName}:${pageRange}`
    );
    if (model) {
      return { [searchTarget]: JSON.parse(model) };
    } else {
      return await AppServices.githubFetchData({
        searchName,
        searchTarget,
        pageRange,
      });
    }
  },

  githubFetchData: async ({ searchName, searchTarget, pageRange }) => {
    return Axios.get(
      `https://api.github.com/search/${searchTarget}?q=${searchName}&page=${pageRange}`
    )
      .then(async (res: any) => {
        const dataToString = JSON.stringify(res.data.items);

        if (!!!res.data.items.length) throw new Error("No data found");

        await (client.SADD(
          `${searchTarget}${searchName}:${pageRange}`,
          dataToString
        ) &&
          client.EXPIRE(
            `${searchTarget}${searchName}:${pageRange}`,
            60 * 60 * 2 // equals 2 hours
          ));

        return { [searchTarget]: JSON.parse(dataToString) };
      })
      .catch((err: Error) => {
        throw { message: err.message };
      });
  },

  flushAllData: async () => {
    const flushAllCashedItems = await client.flushAll();

    if (flushAllCashedItems)
      return { message: "Server deleted all the cached data successfully" };

    throw new Error("Error in deleting Cached data");
  },
};
export default AppServices;
