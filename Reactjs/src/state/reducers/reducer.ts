import Api from "../../API";

interface AppContextStoreProps {
  users: any[];
  repositories: any[];
}

const reducer = (state: AppContextStoreProps, action: any) => {
  const fetchAppData = async ({
    bodyData,
    searchTarget,
  }: {
    bodyData: any;
    searchTarget: "users" | "repositories";
  }) => {
    return await Api({
      method: "post",
      fetchApiUrl: "search",
      data: bodyData,
    }).then((res: any) => {
      state = res.data;
      // setAppContextStore((prevState) => {
      //   return {
      //     repositories: [],
      //     users: [],
      //     [searchTarget]: [
      //       ...prevState[searchTarget],
      //       ...res.data[searchTarget],
      //     ],
      //   };
      // });
    });
  };
  const resetAppData = () => {
    state = {
      users: [],
      repositories: [],
    };
  };
  switch (action.type) {
    case "fetch":
      return fetchAppData;
    case "reset":
      return resetAppData;
  }
};
export default reducer;
