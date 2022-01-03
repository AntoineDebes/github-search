import { stat } from "fs";
import { toast } from "react-toastify";
import { actions } from "./../actions";
interface AppContextStoreProps {
  users: any[];
  repositories: any[];
  searchName: string;
  noDataFound: boolean;
}
const initialState = {
  users: [],
  repositories: [],
  searchName: "",
  noDataFound: false,
};

interface SetAppDataModel {
  res: any;
  searchTarget: "users" | "repositories";
  searchName: string;
}
interface ActionModel extends SetAppDataModel {
  type: "fetch" | "reset" | "noDataReset";
}
const reducer = (
  state: AppContextStoreProps = initialState,
  { type, res, searchTarget, searchName }: ActionModel
) => {
  // switch (type) {
  //   case actions.FETCH:
  //     return setAppData({
  //       res: res,
  //       searchTarget: searchTarget,
  //       searchName: searchName,
  //     });
  //   case actions.RESET:
  //     return resetAppData();
  //   case actions.NO_DATA_RESET:
  //     return resetAppDataWithNoDataError();
  //   default:
  //     return state;
  // }

  const setAppData = ({ res, searchTarget, searchName }: SetAppDataModel) => {
    let newSearchTarget = [...state[searchTarget], ...res[searchTarget]];
    if (state.searchName !== searchName) {
      newSearchTarget = [...res[searchTarget]];
    }
    return {
      repositories: [],
      users: [],
      [searchTarget]: newSearchTarget,
      searchName: searchName,
      noDataFound: false,
    };
  };
  const resetAppData = () => {
    return {
      ...state,
      users: [],
      repositories: [],
      noDataFound: false,
    };
  };
  const resetAppDataWithNoDataError = () => {
    toast("No data found");
    return {
      users: [],
      repositories: [],
      noDataFound: true,
    };
  };
  const functionList: {
    fetch: any;
    reset: any;
    noDataReset: any;
  } = {
    fetch: () => {
      return setAppData({
        res: res,
        searchTarget: searchTarget,
        searchName: searchName,
      });
    },
    reset: () => {
      return resetAppData();
    },
    noDataReset: () => {
      return resetAppDataWithNoDataError();
    },
  };
  console.log("state", state);
  if (functionList[type] && !!functionList[type]) {
    console.log("functionList[type]", functionList[type]);
    return functionList[type]();
  } else {
    console.log("state", state);

    return state;
  }
};
export default reducer;
