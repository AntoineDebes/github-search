export interface AppContextStoreProps {
  users: any[];
  repositories: any[];
}
export interface AppContextProps {
  appContextStore?: AppContextStoreProps;
  setAppContextStore?: any;
  fetchDataFromSearchContext: ({
    bodyData,
    searchTarget,
  }: any) => any | undefined;
  resetAppContext: () => void;
}
