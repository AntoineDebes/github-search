import { combineReducers } from "redux";
import searchDataReducer from "./searchDataReducer";

const reducers = combineReducers({
  search: searchDataReducer,
});

export default reducers;
