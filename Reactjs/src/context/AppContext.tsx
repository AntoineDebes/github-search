import { useState, useContext, createContext } from "react";
import Api from "../API";
import {
  AppContextProps,
  AppContextStoreProps,
} from "../models/ContextAppModel";

const IsAppContext = createContext<Partial<AppContextProps>>({
  appContextStore: {
    users: [],
    repositories: [],
  },
  setAppContextStore: undefined,
  fetchDataFromSearchContext: () => {},
  resetAppContext: () => {},
});

export function useAppContext() {
  return useContext(IsAppContext);
}

export function AppContextProvider({ children }: any) {
  const [appContextStore, setAppContextStore] = useState<AppContextStoreProps>({
    users: [],
    repositories: [],
  });
  const fetchDataFromSearchContext = async ({
    bodyData,
    searchTarget,
  }: {
    bodyData: any;
    searchTarget: "users" | "repositories";
  }) => {
    await Api({ method: "post", fetchApiUrl: "search", data: bodyData }).then(
      (res: any) => {
        setAppContextStore((prevState) => {
          return {
            repositories: [],
            users: [],
            [searchTarget]: [
              ...prevState[searchTarget],
              ...res.data[searchTarget],
            ],
          };
        });

        return;
      }
    );
  };

  const resetAppContext = () => {
    setAppContextStore({
      users: [],
      repositories: [],
    });
  };
  return (
    <>
      <IsAppContext.Provider
        value={{
          appContextStore,
          setAppContextStore,
          resetAppContext,
          fetchDataFromSearchContext,
        }}
      >
        {children}
      </IsAppContext.Provider>
    </>
  );
}
