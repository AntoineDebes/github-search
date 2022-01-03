export interface searchTargetModel {
  searchTarget: "users" | "repositories";
}

export interface AppStoreProps {
  users: any[];
  repositories: any[];
  searchName: string;
  noDataFound: boolean;
}
export interface SetAppDataModel extends searchTargetModel {
  res: any;
  searchName: string;
}
export interface ActionModel extends SetAppDataModel {
  type: "fetch" | "reset" | "noDataReset";
}
