import { combineReducers } from "redux";

import location from "./get_location";
import login from "./login";
import events from "./events";
import user from "./user";

const rootReducer = combineReducers({
  location,
  login,
  events,
  user
});

export default rootReducer;
