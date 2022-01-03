import { PaginationModel } from "./../model/PaginationModel";

export const paginationFunction = ({
  model,
  pageRange,
  searchTarget,
}: PaginationModel) => {
  const paginationPage = (pageRange - 1) * 20;
  const modelParsed = JSON.parse(model);
  if (modelParsed.length < paginationPage)
    return { message: "No more results" };
  const results = modelParsed.splice(paginationPage, 20);
  return {
    [searchTarget]: results,
  };
};
