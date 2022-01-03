import { combineReducers } from "redux";
import reducer from "./reducer";

const reducers = combineReducers({
  search: reducer,
});

export default reducers;
