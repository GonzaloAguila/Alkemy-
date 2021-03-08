import { combineReducers } from "redux";
import operationsReducer from "../reducers/operationsReducer";
import userReducer from "../reducers/usersReducer";

export default combineReducers({
  operationsReducer,
  userReducer,
});