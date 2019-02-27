import {
  UPDATE_HOSTING_EVENT,
  UPDATE_ATTENDING_EVENT
} from "../constants/ActionTypes";
import { ActionSheet } from "native-base";

const initialState = {
  events: [],
  hostingEvents: [],
  attendingEvents: []
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case "setEvents":
      return { ...state, events: action.event };

    case UPDATE_HOSTING_EVENT:
      return { ...state, hostingEvents: action.payload };

    case UPDATE_ATTENDING_EVENT:
      return { ...state, attendingEvents: action.payload };

    default:
      return state;
  }
}
