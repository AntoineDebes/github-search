import {
  ActionModel,
  SetAppDataModel,
  AppStoreProps,
} from "./../../models/ReduxAppModel";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  repositories: [],
  searchName: "",
  noDataFound: false,
};

const reducer = (
  state: AppStoreProps = initialState,
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
        res,
        searchTarget,
        searchName,
      });
    },
    reset: () => {
      return resetAppData();
    },
    noDataReset: () => {
      return resetAppDataWithNoDataError();
    },
  };

  if (functionList[type] && !!functionList[type]) {
    return functionList[type]();
  } else {
    return state;
  }
};
export default reducer;
