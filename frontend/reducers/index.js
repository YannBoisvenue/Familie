import { combineReducers } from "redux";

import location from "./get_location";
import login from "./login";

const rootReducer = combineReducers({
  location,
  login
});

export default rootReducer;
