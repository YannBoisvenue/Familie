import { combineReducers } from "redux";

import location from "./get_location";
import login from "./login";
import events from "./events";
import user from "./user";
import profile from "./profile";

const rootReducer = combineReducers({
  location,
  login,
  events,
  user,
  profile
});

export default rootReducer;
