import { combineReducers } from "redux";

import location from "./get_location";
import login from "./login";
import events from "./events";

const rootReducer = combineReducers({
  location,
  login,
  events
});

export default rootReducer;
