import { searchTargetModel } from "./ReduxAppModel";

export interface FindParamModel extends searchTargetModel {
  searchName: string;
  searchTarget: "users" | "repositories";
  pageRange: number;
}
