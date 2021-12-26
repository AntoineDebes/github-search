import { useState, useContext, createContext } from "react";
import Api from "../API";

interface AppContextProps {
  appContextStore?: any;
  setAppContextStore?: any;
  fetchDataFromSearchContext: ({ bodyData }: any) => any | undefined;
}

const IsAppContext = createContext<Partial<AppContextProps>>({
  appContextStore: undefined,
  setAppContextStore: undefined,
  fetchDataFromSearchContext: () => {},
});

export function useAppContext() {
  return useContext(IsAppContext);
}

export function AppContextProvider({ children }: any) {
  const [appContextStore, setAppContextStore] = useState(undefined);

  const fetchDataFromSearchContext = ({ bodyData }: any) => {
    Api({ method: "post", fetchApiUrl: "search", data: bodyData }).then(
      (res: any) => {
        setAppContextStore(res.data.results);
      }
    );
  };

  return (
    <>
      <IsAppContext.Provider
        value={{
          appContextStore,
          setAppContextStore,
          fetchDataFromSearchContext,
        }}
      >
        {children}
      </IsAppContext.Provider>
    </>
  );
}
