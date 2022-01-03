import { actions } from "./../actions";
import Api from "../../API";

export const fetchAppData = ({ bodyData, searchTarget, searchName }: any) => {
  return (dispatch: any) => {
    return Api({
      method: "post",
      fetchApiUrl: "search",
      data: bodyData,
    })
      .then((res: any) => {
        return dispatch({
          type: actions.FETCH,
          searchTarget: searchTarget,
          res: res.data,
          searchName: searchName,
        });
      })
      .catch((_) => {
        return dispatch({
          type: actions.NO_DATA_RESET,
        });
      });
  };
};

export const resetAppData = () => {
  return (dispatch: any) => {
    dispatch({
      type: actions.RESET,
    });
  };
};
